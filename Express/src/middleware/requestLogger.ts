import type { Request, Response, NextFunction } from "express";


export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const startedAt = Date.now();
    res.on("finish",() => {
        const duration = Date.now() - startedAt;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
    

    if(req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
        console.log(`Body: ${JSON.stringify(req.body)}`);
    }
    });
    next();
    
};