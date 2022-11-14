"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provas_controller_1 = __importDefault(require("../controllers/provas.controller"));
const azure = require("azure-storage");
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
// router.get('/', ModuloController.getModulo);
const multer_azure_blob_storage_1 = require("multer-azure-blob-storage");
function yourCustomLogic(req, file) {
    return file.originalname;
}
const resolveBlobName = (req, file) => {
    return new Promise((resolve, reject) => {
        const blobName = yourCustomLogic(req, file);
        resolve(blobName);
    });
};
const azureStorage = new multer_azure_blob_storage_1.MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=armazenamentotis;AccountKey=izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==;EndpointSuffix=core.windows.net',
    accessKey: 'izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==',
    accountName: 'armazenamentotis',
    containerName: 'demo',
    blobName: resolveBlobName,
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
});
const upload = (0, multer_1.default)({
    storage: azureStorage
});
router.post('/', upload.single("file"), provas_controller_1.default.cadastrarProva);
router.post('/Prova', provas_controller_1.default.retornaProva);
exports.default = router;
