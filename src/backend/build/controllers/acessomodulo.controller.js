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
class AcessoController {
    cadastrarAcesso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuId, moduloId } = req.body;
            let modulos = moduloId.toString().split(",");
            let retorno = yield config_1.default.database();
            yield retorno.query(`delete acessomodulo where usu_id = ${usuId}`);
            if (usuId == null) {
                return res.status(201).send("Necessário selecionar usuário !!!");
            }
            modulos.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                yield retorno.query(`insert into acessomodulo values ('${usuId}','${element}')`);
            }));
            return res.status(200).send("Acesso adicionado para usuário");
        });
    }
    getAcessosAprendiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { aprendiz } = req.query;
            let retorno = yield config_1.default.database();
            let reqUsuarios = yield retorno.query(`select * from acessomodulo where usu_id = ${aprendiz}`);
            let resultadoUsuarios = yield reqUsuarios.recordset;
            return res.status(200).send(resultadoUsuarios);
        });
    }
}
exports.default = new AcessoController();
