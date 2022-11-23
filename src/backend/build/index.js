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
const express_1 = __importDefault(require("express"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const modulos_routes_1 = __importDefault(require("./routes/modulos.routes"));
const acesso_routes_1 = __importDefault(require("./routes/acesso.routes"));
const tutoriais_routes_1 = __importDefault(require("./routes/tutoriais.routes"));
const provas_routes_1 = __importDefault(require("./routes/provas.routes"));
const tutorialvisto_routes_1 = __importDefault(require("./routes/tutorialvisto.routes"));
const app = (0, express_1.default)();
const cors = require('cors');
app.use(express_1.default.json());
app.use(cors());
app.listen(process.env.PORT || 3332);
app.use('/Acessomodulo', acesso_routes_1.default);
app.use('/Usuario', usuario_routes_1.default);
app.use('/Modulo', modulos_routes_1.default);
app.use('/Tutorial', tutoriais_routes_1.default);
app.use('/TutorialVisto', tutorialvisto_routes_1.default);
app.use('/Prova', provas_routes_1.default);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send("Hello World!!");
}));
