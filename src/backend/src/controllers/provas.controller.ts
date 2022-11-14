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
        const connStr = "DefaultEndpointsProtocol=https;AccountName=armazenamentotis;AccountKey=izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==;EndpointSuffix=core.windows.net";

        let retorno = await config.database();
        let existeModulo = await retorno.query(`select * from provas where modulo_id = '${modulo}'`);
        let resultadoExisteModulos = await existeModulo.recordset;
        if(resultadoExisteModulos.length == 0){
            return res.status(200).send("Sem Prova!!");
        }
        const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

        return res.status(200).send("teste");
    }

}

export default new Provas();
