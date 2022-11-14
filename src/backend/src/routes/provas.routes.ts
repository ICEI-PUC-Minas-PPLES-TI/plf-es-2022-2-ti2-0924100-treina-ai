import { Router } from 'express';
import provasController from '../controllers/provas.controller';
const azure = require("azure-storage");
const router = Router();
import multer, { Multer } from 'multer';


// router.get('/', ModuloController.getModulo);
import { MulterAzureStorage, MASNameResolver, MASObjectResolver } from 'multer-azure-blob-storage';

function yourCustomLogic(req: any, file: Express.Multer.File){
    return file.originalname;
}

const resolveBlobName: MASNameResolver = (req: any, file: Express.Multer.File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const blobName: string = yourCustomLogic(req, file);
        resolve(blobName);
    });
};

const azureStorage: MulterAzureStorage = new MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=armazenamentotis;AccountKey=izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==;EndpointSuffix=core.windows.net',
    accessKey: 'izM0/F4Pej6B+2hhdHMpKO4Bcy7zSuUJGLdheikjmnDh+pUMkDS/OCLTeADHdXpeAmOTiNyR4y4j+AStG+nkJw==',
    accountName: 'armazenamentotis',
    containerName: 'demo',
    blobName: resolveBlobName,
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
});

const upload: Multer = multer({
    storage: azureStorage
});

router.post('/',upload.single("file"), provasController.cadastrarProva);
router.post('/Prova', provasController.retornaProva);

export default router;