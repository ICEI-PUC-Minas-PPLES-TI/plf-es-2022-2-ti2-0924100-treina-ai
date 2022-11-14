import { Request, Response, NextFunction } from 'express';

class AuthMiddleware {

    public async autorizarUsuarioByParams(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        const usuario = await req.query.cliente;
        req.body.id = usuario;
        return next();  
    }
}

export default new AuthMiddleware();