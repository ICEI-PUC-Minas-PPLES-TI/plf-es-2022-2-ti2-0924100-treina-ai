import { ContainerClient } from "@azure/storage-blob";
import { Request, Response } from "express";
import config from '../config';
const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");
const {  StorageSharedKeyCredential } = require("@azure/storage-blob");


class Provas {

    public async cadastrarProva(req: any, res: Response): Promise<Response> {
        const {modulo} =  req.body;
        const file = req.file;
        let retorno = await config.database();
        let existeModulo = await retorno.query(`select * from provas where modulo_id = '${modulo}'`);
        let resultadoExisteModulos = await existeModulo.recordset;
        if(resultadoExisteModulos.length > 0){
            return res.status(201).send("Já existe prova para módulo !");
        }
        await retorno.query(`insert into provas values ('${modulo}', '${file.originalname}')`);
        return res.status(200).send("Prova Adicionada");
    }

    public async retornaProva(req: any, res: Response): Promise<Response> {
        const {modulo} = req.query;

        let retorno = await config.database();
        let existeModulo = await retorno.query(`select * from provas where modulo_id = '${modulo}'`);
        let resultadoExisteModulos = await existeModulo.recordset;
        if(resultadoExisteModulos.length == 0){
            return res.status(404).send("Sem Prova!!");
        }
        const account = "armazenamentotis";
        const accountKey = "izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==";
        
        const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
        const blobServiceClient = new BlobServiceClient(
          `https://${account}.blob.core.windows.net`,
          sharedKeyCredential
        );
        let containerItem = await blobServiceClient.getContainerClient("demo");
        let blobs = await containerItem.getBlobClient(resultadoExisteModulos[0].arquivo);
        let arquivo =  {
            nome: resultadoExisteModulos[0].arquivo,
            id: resultadoExisteModulos[0].prova_id,
            arquivo: blobs
        }
        return res.status(200).send(arquivo);
    }

    public async cadastrarProvaFeita(req: any, res: Response): Promise<Response> {
        const {usuId, provaId} =  req.body;
        const file = req.file;
        let retorno = await config.database();
        let existeModulo = await retorno.query(`select * from notaprova where prova_id = '${provaId}' and usu_id = ${usuId}`);
        let resultadoExisteModulos = await existeModulo.recordset;
        if(resultadoExisteModulos.length > 0){
            return res.status(201).send("Já foi enviada a prova");
        }
        if(file == undefined){
            return res.status(404).send("Sem arquivo");
        }
        await retorno.query(`insert into notaprova (usu_id, prova_id, arquivo) values (${usuId}, ${provaId},'${file.originalname}')`);
        return res.status(200).send("Prova Adicionada");
    }

    public async provasFeitas(req: any, res: Response): Promise<Response> {
        const {usuId} =  req.body;
        let retorno = await config.database();
        let existeModulo = await retorno.query(`select m.nome, np.arquivo, np.nota from 
                                                provas p
                                                    inner join modulo m on p.modulo_id = m.modulo_id
                                                    inner join notaprova np on p.prova_id = np.prova_id
                                                where usu_id = ${usuId}`);
        let resultadoExisteModulos = await existeModulo.recordset;
        if(resultadoExisteModulos.length == 0){
            return res.status(404).send("Sem provas feitas");
        }
        const account = "armazenamentotis";
        const accountKey = "izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==";
        
        const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
        const blobServiceClient = new BlobServiceClient(
          `https://${account}.blob.core.windows.net`,
          sharedKeyCredential
        );
        let containerItem = await blobServiceClient.getContainerClient("demo");
        let final: { modulo: any; nota: any; arquivo: any; }[] = [];
        resultadoExisteModulos.forEach((element: any, index: any) => {
            let blobs = containerItem.getBlobClient(resultadoExisteModulos[index].arquivo);
            let arquivo =  {
                modulo: resultadoExisteModulos[index].nome,
                nota: resultadoExisteModulos[index].nota,
                arquivo: blobs
            }
            final.push(arquivo);
            
        });
        
        return res.status(200).send(final);
    }

    public async provasSemNota(req: any, res: Response): Promise<Response> {
        let retorno = await config.database();
        let existeModulo = await retorno.query(`select u.nome as usuNome, u.usu_id,  p.arquivo as prova, np.prova_id, np.arquivo as ProvaAluno, m.nome as modulo from
                                                notaprova np
                                                        inner join provas p on p.prova_id = np.prova_id
                                                        inner join usuario u on np.usu_id = u.usu_id,
                                                        provas pa left join modulo m on pa.modulo_id = m.modulo_id
                                                where np.nota is null
                                                and pa.prova_id = p.prova_id`);
        let resultadoExisteModulos = await existeModulo.recordset;
        const account = "armazenamentotis";
        const accountKey = "izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==";
        
        const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
        const blobServiceClient = new BlobServiceClient(
          `https://${account}.blob.core.windows.net`,
          sharedKeyCredential
        );
        let containerItem = await blobServiceClient.getContainerClient("demo");
        let final: { usuId: any; nota: any; modulo:any; provaId:any; arquivoOriginal: any; arquivoAluno:any }[] = [];
        resultadoExisteModulos.forEach((element: any, index: any) => {
            let blobsAdm = containerItem.getBlobClient(resultadoExisteModulos[index].prova);
            let blobsAprendiz = containerItem.getBlobClient(resultadoExisteModulos[index].ProvaAluno);
            let arquivo =  {
                usuNome: resultadoExisteModulos[index].usuNome,
                usuId: resultadoExisteModulos[index].usu_id,
                nota: resultadoExisteModulos[index].nota,
                modulo: resultadoExisteModulos[index].modulo,
                provaId: resultadoExisteModulos[index].prova_id,
                arquivoOriginal: blobsAdm,
                arquivoAluno: blobsAprendiz
            }
            final.push(arquivo);
            
        });
        return res.status(200).send(final);
    }

    public async cadastrarNota(req: any, res: Response): Promise<Response> {
        const {usuId, provaId, nota} =  req.body;
        let retorno = await config.database();
        let existeModulo = await retorno.query(`select * from notaprova where prova_id = '${provaId}' and usu_id = ${usuId} and nota is null`);
        let resultadoExisteModulos = await existeModulo.recordset;
        if(resultadoExisteModulos.length == 0){
            return res.status(404).send("Não existe prova no sistema");
        }
        await retorno.query(`UPDATE notaprova SET nota = ${nota} WHERE usu_id = ${usuId} and prova_id = ${provaId}`);
        return res.status(200).send("Prova Adicionada");
    }
}

export default new Provas();
