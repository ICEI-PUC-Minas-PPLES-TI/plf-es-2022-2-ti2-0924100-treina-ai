"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tutoriais_controller_1 = __importDefault(require("../controllers/tutoriais.controller"));
const router = (0, express_1.Router)();
router.post('/', tutoriais_controller_1.default.cadastrarTutoriais);
router.post('/Modulo', tutoriais_controller_1.default.getTutoriais);
router.delete('/Apagar', tutoriais_controller_1.default.apagarTutorial);
exports.default = router;
