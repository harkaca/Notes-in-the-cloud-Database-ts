import { Router } from 'express';
import mongoose from 'mongoose';
import { NoteModel } from '../models/note.model';

const noteController = Router();

//add a note
noteController.post('/add', async (req, res) => {
    try {
        if (!req.body.name || !req.body.content || !req.body.folderId) {
            return res.status(400).json({ message: 'Missing required fields for the note!' });
        }

        const newNote = new NoteModel({
            name: req.body.name,
            content: req.body.content,
            folderId: req.body.folderId,
            id: new mongoose.Types.ObjectId()
        });

        await newNote.save();

        return res.status(201).json(newNote);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//get array of notes from the same folder
noteController.get('/getByFolderId/:folderId', async (req, res) => {
    try {
        const notes = await NoteModel.find({ folderId: req.params.folderId });

        if (!notes || notes.length === 0) {
            return res.status(404).json({ message: 'No notes found for the this Id' });
        }

        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//get all notes
noteController.get('/getAll', async (req, res) => {
    try {
        const users = await NoteModel.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No notes were found' });
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//delete all notes from a ceratin folder by its id
noteController.delete('/deleteByFolderId/:folderId', async (req, res) => {
    try {
        await NoteModel.deleteMany({ folderId: req.params.folderId });

        return res.status(200).json({ message: 'All notes from the folder have been deleted' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//delete note by its name
noteController.delete('/deleteByName/:noteName', async (req, res) => {
    try {
        const deletedNote = await NoteModel.findOneAndDelete({ name: req.params.noteName });

        if (!deletedNote) {
            return res.status(404).json({ message: 'The note was not found' });
        }

        return res.status(200).json({ message: 'The note was deleted successfully', deletedNote });
    } catch (error) {
        return res.status(500).json(error);
    }
});

export default noteController;
