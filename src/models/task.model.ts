// Imports //
import { Schema, model } from 'mongoose';

// Schemas //
let taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps: { createdAt: true, updatedAt: true } });

// Export //
export default model('task', taskSchema);