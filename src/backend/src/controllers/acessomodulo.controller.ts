import { Request, Response } from "express";
import config from '../config';

class AcessoController {

    public async cadastrarAcesso(req: Request, res: Response): Promise<Response> {
        const {usuId, moduloId} =  req.body;
        let modulos = moduloId.toString().split(",");
        let retorno = await config.database();
        await retorno.query(`delete acessomodulo where usu_id = ${usuId}`);
        if(usuId == null){
            return res.status(201).send("Necessário selecionar usuário !!!");
        }
        modulos.forEach(async (element : string) => {
            await retorno.query(`insert into acessomodulo values ('${usuId}','${element}')`);
        });
        return res.status(200).send("Acesso adicionado para usuário");
    }

    public async getAcessosAprendiz(req: Request, res: Response): Promise<Response>{
        const {aprendiz} = req.query;
        let retorno = await config.database();
        let reqUsuarios = await retorno.query(`select * from acessomodulo where usu_id = ${aprendiz}`);
        let resultadoUsuarios = await reqUsuarios.recordset;
        return res.status(200).send(resultadoUsuarios);
    }

}

export default new AcessoController();