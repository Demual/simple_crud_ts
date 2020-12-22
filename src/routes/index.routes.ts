// Imports //
import { Request, Response, Router } from 'express';

// Class //
class IndexRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    };
    routes() {
        this.router.get('/hello', (req: Request, res: Response) => res.json({ message: 'Hello NodeJS, MongoDB and TypeScript' }));
        this.router.get('/', (req: Request, res: Response) => res.render('index'));
    };
};

// Activate IndexRoutes //
let indexRoutes = new IndexRoutes();
indexRoutes.routes();

// Exports //
export default indexRoutes.router;