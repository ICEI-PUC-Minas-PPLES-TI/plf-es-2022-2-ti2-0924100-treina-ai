import { Request, Response } from "express";
import config from '../config';
import tipos from '../enum/tipos'

class UsuarioController {

    public async cadastrarUsuario(req: Request, res: Response): Promise<Response> {
        const {nome, email, senha, sobrenome, tipo} =  req.body;
        
        let retorno = await config.database();
        let existeUsuario = await retorno.query(`select * from usuario where email = '${email}'`);
        let resultadoExisteUsuarios = await existeUsuario.recordset;
        if(resultadoExisteUsuarios.length > 0){
            return res.status(201).send("Já existe o Usuário !");
        }
        await retorno.query(`insert into usuario values ('${nome}','${email}', '${senha}','${sobrenome}','${tipo}')`);
        return res.status(200).send("Usuario Adicionado");
    }

    public async getAprendiz(req: Request, res: Response): Promise<Response> {
        let retorno = await config.database();
        let retornoUsuarios = await retorno.query(`select * from usuario where tipo =${tipos.Aprendiz}`);
        let resultadoUsuarios = await retornoUsuarios.recordset;
        return res.status(200).send(resultadoUsuarios);
    }  

    public async getUsuario(req: Request, res: Response): Promise<Response> {
        const {email, senha} =  req.body;
        let retorno = await config.database();
        let retornoUsuarios = await retorno.query(`select * from usuario where email = '${email}' and senha = '${senha}'`);
        let resultadoUsuarios = await retornoUsuarios.recordset;
        if(resultadoUsuarios.length == 0){
            return res.status(404).send("Usuário ou senha incorreto");
        }
        return res.status(200).send(resultadoUsuarios);
    }  

    public async getUsuarioById(req: Request, res: Response): Promise<Response> {
        const {cliente} =  req.query;
        let retorno = await config.database();
        let retornoUsuarios = await retorno.query(`select * from usuario where usu_id = ${cliente}`);
        let resultadoUsuarios = await retornoUsuarios.recordset;
        return res.status(200).send(resultadoUsuarios);
    }  
}

export default new UsuarioController();