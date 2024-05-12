import {Schema, model} from 'mongoose';

const noteSchema = new Schema({
    id:Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    folderId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export const NoteModel = model('Note', noteSchema);
