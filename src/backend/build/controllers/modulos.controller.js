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
class UsuarioController {
    cadastrarModulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome } = req.body;
            let retorno = yield config_1.default.database();
            let existeModulo = yield retorno.query(`select * from modulo where nome = '${nome}'`);
            let resultadoExisteModulos = yield existeModulo.recordset;
            if (resultadoExisteModulos.length > 0) {
                return res.status(201).send("Já existe o módulo !");
            }
            yield retorno.query(`insert into modulo values ('${nome}')`);
            return res.status(200).send("Módulo Adicionado");
        });
    }
    getModulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let retorno = yield config_1.default.database();
            let retornoModulos = yield retorno.query(`select * from modulo`);
            let resultadoModulos = yield retornoModulos.recordset;
            return res.status(200).send(resultadoModulos);
        });
    }
    getModuloComTarefas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let retorno = yield config_1.default.database();
            let retornoModulos = yield retorno.query(`select m.modulo_id,m.nome ,count(t.modulo_id) numtarefa
                                                    from tutoriais t right join modulo m on m.modulo_id = t.modulo_id
                                                    group by t.modulo_id,m.modulo_id,m.nome`);
            let resultadoModulos = yield retornoModulos.recordset;
            return res.status(200).send(resultadoModulos);
        });
    }
    getModulosEspecificos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            let retorno = yield config_1.default.database();
            let retornoModulos = yield retorno.query(`
        select
        m.nome, m.modulo_id, count(t.modulo_id) numtarefa
        from
        acessomodulo a
        inner join modulo m on m.modulo_id = a.modulo_id
        inner join usuario u on u.usu_id = a.usu_id
		left join tutoriais t on t.modulo_id = a.modulo_id
        where u.usu_id = ${id}
        group by m.nome, m.modulo_id, t.modulo_id`);
            let resultadoModulos = yield retornoModulos.recordset;
            return res.status(200).send(resultadoModulos);
        });
    }
    deletarModulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { moduloId } = req.query;
            let retorno = yield config_1.default.database();
            let existeModulo = yield retorno.query(`select * from modulo where modulo_id = '${moduloId}'`);
            let resultadoExisteModulos = yield existeModulo.recordset;
            if (resultadoExisteModulos.length == 0) {
                return res.status(404).send("Não existe módulo!");
            }
            let existeAcessoModulos = yield retorno.query(`select * from acessomodulo where modulo_id = '${moduloId}'`);
            let resultadoAcessoModulo = yield existeAcessoModulos.recordset;
            if (resultadoAcessoModulo.length > 0) {
                yield retorno.query(`delete from acessomodulo where modulo_id = ${moduloId}`);
            }
            let existeTutoriais = yield retorno.query(`select * from tutoriais where modulo_id = '${moduloId}'`);
            let resultadoExisteTutoriais = yield existeTutoriais.recordset;
            if (resultadoExisteTutoriais.length > 0) {
                yield resultadoExisteTutoriais.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield retorno.query(`delete from tutorialvizualizado where tutorial_id = ${element.tutorial_id}`);
                    yield retorno.query(`delete from tutoriais where tutorial_id = ${element.tutorial_id}`);
                }));
            }
            let existeProvas = yield retorno.query(`select * from provas where modulo_id = '${moduloId}'`);
            let resultadoExisteProvas = yield existeProvas.recordset;
            if (resultadoExisteProvas.length > 0) {
                yield resultadoExisteProvas.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield retorno.query(`delete from notaprova where prova_id = ${element.prova_id}`);
                }));
                yield retorno.query(`delete from provas where modulo_id = ${moduloId}`);
            }
            yield retorno.query(`delete from modulo where modulo_id = ${moduloId}`);
            return res.status(200).send("Módulo Excluído");
        });
    }
}
exports.default = new UsuarioController();
