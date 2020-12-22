"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports //
const express_1 = require("express");
// Class //
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    ;
    routes() {
        this.router.get('/hello', (req, res) => res.json({ message: 'Hello NodeJS, MongoDB and TypeScript' }));
        this.router.get('/', (req, res) => res.render('index'));
    }
    ;
}
;
// Activate IndexRoutes //
let indexRoutes = new IndexRoutes();
indexRoutes.routes();
// Exports //
exports.default = indexRoutes.router;
