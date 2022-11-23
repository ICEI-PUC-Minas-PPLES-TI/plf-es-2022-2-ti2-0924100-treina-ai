"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tutorialvisto_controller_1 = __importDefault(require("../controllers/tutorialvisto.controller"));
const router = (0, express_1.Router)();
router.post('/Cadastrar', tutorialvisto_controller_1.default.cadastrarTutorialVisto);
router.post('/Verificar', tutorialvisto_controller_1.default.VerificarTutorialVisto);
router.post('/Modulo', tutorialvisto_controller_1.default.VerificarTutorialVistoPorModulo);
exports.default = router;
