import {Router} from 'express';
import { Counter } from '../models/Counter.js';
import { decrement, getCurrentCount, getHistory, increment } from '../functions/counterActions.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { Roles } from '../objects/roles.js';

export const router = Router();

router.get('/count', authMiddleware([Roles.reader]), async (req, res)=>{
    try{
        let count  = await getCurrentCount()
    
        res.json({count: count})
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    
})

router.post('/increment', authMiddleware([Roles.reader]), async (req, res)=>{
    try{
        await increment();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
})

router.post('/decrement', authMiddleware([Roles.reader]), async (req, res)=>{
    try{
        await decrement();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
})

router.get('/history', authMiddleware([Roles.admin]), async (req, res)=>{
    try{
        let history = await getHistory();
        res.json(history);
    } catch (e) {
        res.sendStatus(500);
    }
})