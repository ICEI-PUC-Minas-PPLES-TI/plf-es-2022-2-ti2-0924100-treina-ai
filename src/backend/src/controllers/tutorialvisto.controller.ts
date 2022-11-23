import { Request, Response } from "express";
import config from '../config';

class TutorialVistoController {

    public async cadastrarTutorialVisto(req: Request, res: Response): Promise<Response> {
        const {usuId, tutorialId} =  req.body;
        
        let retorno = await config.database();
        let existeTutorial = await retorno.query(`select * from tutorialvizualizado where usu_id = ${usuId} and tutorial_id = ${tutorialId}`);
        let resultadoExisteTutorials = await existeTutorial.recordset;
        if(resultadoExisteTutorials.length > 0){
            await retorno.query(`delete from tutorialvizualizado where usu_id = ${usuId} and tutorial_id = ${tutorialId}`);
            return res.status(200).send("Tutorial desvisto !!");
        }
        await retorno.query(`insert into tutorialvizualizado values (${usuId},${tutorialId})`);
        return res.status(200).send("Tutorial visto !!");
    }

    public async VerificarTutorialVisto(req: Request, res: Response): Promise<Response> {
        const {usuId, tutorialId} =  req.body;
        
        let retorno = await config.database();
        let existeTutorial = await retorno.query(`select * from tutorialvizualizado where usu_id = ${usuId} and tutorial_id = ${tutorialId}`);
        let resultadoExisteTutorials = await existeTutorial.recordset;
        if(resultadoExisteTutorials.length > 0){
            return res.status(200).send("Tutorial desvisto !!");
        }
        return res.status(404).send("Tutorial nao visto !!");
    }

    public async VerificarTutorialVistoPorModulo(req: Request, res: Response): Promise<Response> {
        const {usuId, moduloId} =  req.body;
        
        let retorno = await config.database();
        let existeTutorial = await retorno.query(`select count(m.modulo_id) qtde from 
                                                    tutoriais t 
                                                    right join modulo m on t.modulo_id = m.modulo_id
                                                    left join tutorialvizualizado tz on t.tutorial_id = tz.tutorial_id
                                                where m.modulo_id = ${moduloId}
                                                and tz.usu_id = ${usuId}
                                                group by m.modulo_id`);
        let resultadoExisteTutorials = await existeTutorial.recordset;
        if(resultadoExisteTutorials.length > 0){
            return res.status(200).send(resultadoExisteTutorials);
        }
        return res.status(404).send("Não possui");
    }
}

export default new TutorialVistoController();