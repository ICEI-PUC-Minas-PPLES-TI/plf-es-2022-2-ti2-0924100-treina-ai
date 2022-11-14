import { Request, Response } from "express";
import config from '../config';
var formidable = require('formidable');
var fs = require('fs');
import {FormDataEncoder} from "form-data-encoder"

class Tutoriais {

    public async cadastrarTutoriais(req: any, res: Response): Promise<Response> {
        const {nome, conteudo, video, modulo} =  req.body;
        
        let retorno = await config.database();
        let existeTutorial = await retorno.query(`select * from tutoriais where nome = '${nome}' and modulo_id = ${modulo}`);
        let resultadoExisteTutorials = await existeTutorial.recordset;
        if(resultadoExisteTutorials.length > 0){
            return res.status(201).send("Já existe o Tutorial !");
        }
        await retorno.query(`insert into tutoriais values ('${modulo}','${nome}', '${conteudo}','${video}')`);
        return res.status(200).send("Tutorial adicionado !!");
    }

    public async getTutoriais(req: any, res: Response): Promise<Response> {
        const {modulo} =  req.body;
        
        let retorno = await config.database();
        let existeTutorial = await retorno.query(`select * from tutoriais where modulo_id = ${modulo}`);
        let resultadoExisteTutorials = await existeTutorial.recordset;
        return res.status(200).send(resultadoExisteTutorials);
    }

}

export default new Tutoriais();
