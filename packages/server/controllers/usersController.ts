import { databaseQuery } from '../db';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, accountType } = req.body;
    if (!name || !email || !password || !accountType) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    const duplicateUser = await databaseQuery('SELECT * FROM users WHERE email = $1', [email]);
    if (duplicateUser.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await databaseQuery(
            'INSERT INTO users (name, email, password, account_type) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, hashedPassword, accountType]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    const user = await databaseQuery('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    } else {
        res.json({ success: `User ${user.rows[0].name} logged in successfully` });
    }
};
