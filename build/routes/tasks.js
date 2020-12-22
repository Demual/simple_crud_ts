"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports //
const express_1 = require("express");
// Import models //
const task_model_1 = __importDefault(require("../models/task.model"));
// Class //
class TasksRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    ;
    writeTask(req, res) {
        res.render('tasks/create');
    }
    ;
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let newTask = new task_model_1.default(req.body);
            yield newTask.save();
            console.log(newTask);
            res.render('tasks/create');
            res.redirect('/tasks/list');
        });
    }
    ;
    listTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let listTask = yield task_model_1.default.find();
            console.log(listTask);
            res.render('tasks/list', { listTask });
        });
    }
    ;
    readTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let readTask = yield task_model_1.default.findById(id);
            console.log(readTask);
            res.render('tasks/edit', { readTask });
        });
    }
    ;
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let { title, description } = req.body;
            yield task_model_1.default.findByIdAndUpdate(id, { title, description });
            res.redirect('/tasks/list');
        });
    }
    ;
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            yield task_model_1.default.findByIdAndDelete(id);
            res.redirect('/tasks/list');
        });
    }
    ;
    routes() {
        this.router.get('/write', this.writeTask);
        this.router.post('/create', this.createTask);
        this.router.get('/edit/:id', this.readTask);
        this.router.post('/edit/:id', this.updateTask);
        this.router.get('/list', this.listTasks);
        this.router.get('/delete/:id', this.deleteTask);
    }
    ;
}
;
// Activate IndexRoutes //
let tasksRoutes = new TasksRoutes();
// Exports //
exports.default = tasksRoutes.router;
