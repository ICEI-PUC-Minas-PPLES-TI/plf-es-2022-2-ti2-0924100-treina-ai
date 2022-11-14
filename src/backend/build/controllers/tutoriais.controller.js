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
var formidable = require('formidable');
var fs = require('fs');
class Tutoriais {
    cadastrarTutoriais(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, conteudo, video, modulo } = req.body;
            let retorno = yield config_1.default.database();
            let existeTutorial = yield retorno.query(`select * from tutoriais where nome = '${nome}' and modulo_id = ${modulo}`);
            let resultadoExisteTutorials = yield existeTutorial.recordset;
            if (resultadoExisteTutorials.length > 0) {
                return res.status(201).send("Já existe o Tutorial !");
            }
            yield retorno.query(`insert into tutoriais values ('${modulo}','${nome}', '${conteudo}','${video}')`);
            return res.status(200).send("Tutorial adicionado !!");
        });
    }
    getTutoriais(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modulo } = req.body;
            let retorno = yield config_1.default.database();
            let existeTutorial = yield retorno.query(`select * from tutoriais where modulo_id = ${modulo}`);
            let resultadoExisteTutorials = yield existeTutorial.recordset;
            return res.status(200).send(resultadoExisteTutorials);
        });
    }
}
exports.default = new Tutoriais();
