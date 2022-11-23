"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
class TutorialVistoController {
    cadastrarTutorialVisto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuId, tutorialId } = req.body;
            let retorno = yield config_1.default.database();
            let existeTutorial = yield retorno.query(`select * from tutorialvizualizado where usu_id = ${usuId} and tutorial_id = ${tutorialId}`);
            let resultadoExisteTutorials = yield existeTutorial.recordset;
            if (resultadoExisteTutorials.length > 0) {
                yield retorno.query(`delete from tutorialvizualizado where usu_id = ${usuId} and tutorial_id = ${tutorialId}`);
                return res.status(200).send("Tutorial desvisto !!");
            }
            yield retorno.query(`insert into tutorialvizualizado values (${usuId},${tutorialId})`);
            return res.status(200).send("Tutorial visto !!");
        });
    }
    VerificarTutorialVisto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuId, tutorialId } = req.body;
            let retorno = yield config_1.default.database();
            let existeTutorial = yield retorno.query(`select * from tutorialvizualizado where usu_id = ${usuId} and tutorial_id = ${tutorialId}`);
            let resultadoExisteTutorials = yield existeTutorial.recordset;
            if (resultadoExisteTutorials.length > 0) {
                return res.status(200).send("Tutorial desvisto !!");
            }
            return res.status(404).send("Tutorial nao visto !!");
        });
    }
    VerificarTutorialVistoPorModulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuId, moduloId } = req.body;
            let retorno = yield config_1.default.database();
            let existeTutorial = yield retorno.query(`select count(m.modulo_id) qtde from 
                                                    tutoriais t 
                                                    right join modulo m on t.modulo_id = m.modulo_id
                                                    left join tutorialvizualizado tz on t.tutorial_id = tz.tutorial_id
                                                where m.modulo_id = ${moduloId}
                                                and tz.usu_id = ${usuId}
                                                group by m.modulo_id`);
            let resultadoExisteTutorials = yield existeTutorial.recordset;
            if (resultadoExisteTutorials.length > 0) {
                return res.status(200).send(resultadoExisteTutorials);
            }
            return res.status(404).send("Não possui");
        });
    }
}
exports.default = new TutorialVistoController();
