"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports //
const mongoose_1 = require("mongoose");
// Schemas //
let taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: { createdAt: true, updatedAt: true } });
// Export //
exports.default = mongoose_1.model('task', taskSchema);
