import {Schema, model} from 'mongoose';

const CounterSchema = new Schema({
    time: {type: Date, required: true},
    actions: [{type: Number}]
});

export const Counter =  model('Counter', CounterSchema);