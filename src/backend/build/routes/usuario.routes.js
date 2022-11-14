"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = __importDefault(require("../controllers/usuario.controller"));
const router = (0, express_1.Router)();
router.get('/', usuario_controller_1.default.getAprendiz);
router.post('/', usuario_controller_1.default.getUsuario);
router.post('/Cadastrar', usuario_controller_1.default.cadastrarUsuario);
router.get('/userId', usuario_controller_1.default.getUsuarioById);
exports.default = router;
