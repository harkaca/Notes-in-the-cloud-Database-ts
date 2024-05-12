import { Router } from 'express';
import mongoose from 'mongoose';
import { UserModel } from '../models/user.model';
import { hash, hashSync, genSaltSync } from 'bcrypt';

const userController = Router();

userController.post('/add', async (req, res) => {
    try {
        if (!req.body.email || !req.body.username || !req.body.password) {
            return res.status(400).json({ message: 'Missing required fields for the user!' });
        }

        const hashedPassword: string = await hash(req.body.password, 10); //?????

        const newUser = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            id: new mongoose.Types.ObjectId()
        });

        await newUser.save();

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json(error);
    }
});

userController.get('/getAll', async (req, res) => {
    try {
        const users = await UserModel.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No useres were found' });
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
});

userController.get('getById/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'The user was not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
});

userController.get('/getByUsername/:username', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: 'The user was not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
});

userController.delete('/deleteByUsername/:username', async (req, res) => {
    try {
        const deletedUser = await UserModel.findOneAndDelete({ username: req.params.username });

        if (!deletedUser) {
            return res.status(404).json({ message: 'The user was not found' });
        }

        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.status(500).json(error);
    }
});


export default userController;
