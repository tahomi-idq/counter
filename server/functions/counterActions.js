import { Counter } from "../models/Counter.js";

export async function getCurrentCount() {
    const counter = (await Counter.find().sort({time:-1}).limit(1)).at(0);

    if(counter === undefined) {
        return null;
    }

    return getCount(counter);
}

export async function increment() {
    const lastCounter = (await Counter.find().sort({time: -1}).limit(1)).at(0);
    lastCounter.actions.push(1);
    await lastCounter.save();
}

export async function decrement() {
    const lastCounter = (await Counter.find().sort({time: -1}).limit(1)).at(0);
    lastCounter.actions.push(-1);
    await lastCounter.save();
}

export async function getHistory() {
    const counters = await Counter.find().sort({time: -1});
        
    let countersData = []
    counters.forEach(counter=>{

        countersData.push({
            time: counter.time,
            count: getCount(counter)
        })
    });

    return countersData;
}

export async function createNewCounter() {
    let currentCount = await getCurrentCount();

    if(currentCount !== 0) {
        const newCounter = new Counter({
            time: Date.now(),
            actions: []
        })
            
        await newCounter.save();
    }
}

function getCount(counter) {
    let count = 0;

    if(counter.actions.length > 0) {
        counter.actions.forEach((act)=>{
            count += act;
        })

    }

    return count;
}

