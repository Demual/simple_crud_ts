"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports //
const server_1 = require("./server");
// import './config/mongoose'
// Server ON //
let server = new server_1.Server();
server.start();
