import {Router} from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';
import bcrypt from 'bcrypt';
import { Roles } from '../objects/roles.js';
import { Role } from '../models/Role.js'
import { secret } from '../config.js';

export const authRouter = Router();

authRouter.post('/register', register)
authRouter.post('/login', login)

async function login(req, res) {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user) {
            return res.status(400).json({message: `Пользователь ${username} не найден`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({message: `Введен неверный пароль`})
        }
        const token = generateAccessToken(user._id, user.roles)
        return res.json({token})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Login error'})
    }
}

async function register(req, res) {
    try {
        const {username, password} = req.body;
        if(username.length == 0 || password.length == 0) {
            return res.status(400).json({message: "Пароль или логин пустой"})
        }
        const candidate = await User.findOne({username})
        if (candidate) {
            return res.status(400).json({message: "Пользователь с таким именем уже существует"})
        }
        const hashPassword = bcrypt.hashSync(password, 6);
        const userRole = await Role.findOne({value: Roles.reader})
        const user = new User({username, password: hashPassword, roles: [userRole.value]})
        await user.save()
        return res.json({message: "Пользователь успешно зарегистрирован"})
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Registration error'})
    }
}

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}