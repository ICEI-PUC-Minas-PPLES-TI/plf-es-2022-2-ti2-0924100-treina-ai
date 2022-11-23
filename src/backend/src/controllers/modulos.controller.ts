import { Request, Response } from "express";
import config from '../config';

class UsuarioController {

    public async cadastrarModulo(req: Request, res: Response): Promise<Response> {
        const {nome} =  req.body;
        
        let retorno = await config.database();
        let existeModulo = await retorno.query(`select * from modulo where nome = '${nome}'`);
        let resultadoExisteModulos = await existeModulo.recordset;
        if(resultadoExisteModulos.length > 0){
            return res.status(201).send("Já existe o módulo !");
        }
        await retorno.query(`insert into modulo values ('${nome}')`);
        return res.status(200).send("Módulo Adicionado");
    }

    public async getModulo(req: Request, res: Response): Promise<Response> {
        let retorno = await config.database();
        let retornoModulos = await retorno.query(`select * from modulo`);
        let resultadoModulos = await retornoModulos.recordset;
        return res.status(200).send(resultadoModulos);
    }  

    public async getModuloComTarefas(req: Request, res: Response): Promise<Response> {
        let retorno = await config.database();
        let retornoModulos = await retorno.query(`select m.modulo_id,m.nome ,count(t.modulo_id) numtarefa
                                                    from tutoriais t right join modulo m on m.modulo_id = t.modulo_id
                                                    group by t.modulo_id,m.modulo_id,m.nome`);
        let resultadoModulos = await retornoModulos.recordset;
        return res.status(200).send(resultadoModulos);
    }  

    public async getModulosEspecificos(req: Request, res: Response): Promise<Response> {
        const {id} =  req.body;
        let retorno = await config.database();
        let retornoModulos = await retorno.query(`
        select
        m.nome, m.modulo_id, count(t.modulo_id) numtarefa
        from
        acessomodulo a
        inner join modulo m on m.modulo_id = a.modulo_id
        inner join usuario u on u.usu_id = a.usu_id
		left join tutoriais t on t.modulo_id = a.modulo_id
        where u.usu_id = ${id}
        group by m.nome, m.modulo_id, t.modulo_id`);
        let resultadoModulos = await retornoModulos.recordset;
        return res.status(200).send(resultadoModulos);
    }  

    public async deletarModulo(req: Request, res: Response): Promise<Response> {
        const {moduloId} =  req.query;
        
        let retorno = await config.database();
        let existeModulo = await retorno.query(`select * from modulo where modulo_id = '${moduloId}'`);
        let resultadoExisteModulos = await existeModulo.recordset;
        if(resultadoExisteModulos.length == 0){
            return res.status(404).send("Não existe módulo!");
        }

        let existeAcessoModulos = await retorno.query(`select * from acessomodulo where modulo_id = '${moduloId}'`);
        let resultadoAcessoModulo = await existeAcessoModulos.recordset;
        if(resultadoAcessoModulo.length>0){
            await retorno.query(`delete from acessomodulo where modulo_id = ${moduloId}`);
        }


        let existeTutoriais = await retorno.query(`select * from tutoriais where modulo_id = '${moduloId}'`);
        let resultadoExisteTutoriais = await existeTutoriais.recordset;
        if(resultadoExisteTutoriais.length > 0){
            await resultadoExisteTutoriais.forEach(async (element: any) => {
                await retorno.query(`delete from tutorialvizualizado where tutorial_id = ${element.tutorial_id}`);
                await retorno.query(`delete from tutoriais where tutorial_id = ${element.tutorial_id}`);
            });
        }

        let existeProvas = await retorno.query(`select * from provas where modulo_id = '${moduloId}'`);
        let resultadoExisteProvas = await existeProvas.recordset;
        if(resultadoExisteProvas.length > 0){
            await resultadoExisteProvas.forEach(async (element: any) => {
                await retorno.query(`delete from notaprova where prova_id = ${element.prova_id}`);
            });
            await retorno.query(`delete from provas where modulo_id = ${moduloId}`);
        }

        await retorno.query(`delete from modulo where modulo_id = ${moduloId}`);
        return res.status(200).send("Módulo Excluído");
    }
}

export default new UsuarioController();