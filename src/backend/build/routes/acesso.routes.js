"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const acessomodulo_controller_1 = __importDefault(require("../controllers/acessomodulo.controller"));
const router = (0, express_1.Router)();
// router.get('/', ModuloController.getModulo);
router.get('/usuario', acessomodulo_controller_1.default.getAcessosAprendiz);
router.post('/Cadastrar', acessomodulo_controller_1.default.cadastrarAcesso);
exports.default = router;
