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
const tipos_1 = __importDefault(require("../enum/tipos"));
class UsuarioController {
    cadastrarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha, sobrenome, tipo } = req.body;
            let retorno = yield config_1.default.database();
            let existeUsuario = yield retorno.query(`select * from usuario where email = '${email}'`);
            let resultadoExisteUsuarios = yield existeUsuario.recordset;
            if (resultadoExisteUsuarios.length > 0) {
                return res.status(201).send("Já existe o Usuário !");
            }
            yield retorno.query(`insert into usuario values ('${nome}','${email}', '${senha}','${sobrenome}','${tipo}')`);
            return res.status(200).send("Usuario Adicionado");
        });
    }
    getAprendiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let retorno = yield config_1.default.database();
            let retornoUsuarios = yield retorno.query(`select * from usuario where tipo =${tipos_1.default.Aprendiz}`);
            let resultadoUsuarios = yield retornoUsuarios.recordset;
            return res.status(200).send(resultadoUsuarios);
        });
    }
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            let retorno = yield config_1.default.database();
            let retornoUsuarios = yield retorno.query(`select * from usuario where email = '${email}' and senha = '${senha}'`);
            let resultadoUsuarios = yield retornoUsuarios.recordset;
            if (resultadoUsuarios.length == 0) {
                return res.status(404).send("Usuário ou senha incorreto");
            }
            return res.status(200).send(resultadoUsuarios);
        });
    }
    getUsuarioById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cliente } = req.query;
            let retorno = yield config_1.default.database();
            let retornoUsuarios = yield retorno.query(`select * from usuario where usu_id = ${cliente}`);
            let resultadoUsuarios = yield retornoUsuarios.recordset;
            return res.status(200).send(resultadoUsuarios);
        });
    }
}
exports.default = new UsuarioController();
