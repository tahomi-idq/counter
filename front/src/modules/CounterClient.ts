import axios from "axios";

const url = "http://192.168.0.105:3333";
export const authKey = "counter-auth-token";

// axios.defaults.headers.common['Authorization'] = getAuthToken();

export async function getCount() {
    return axios.get(url + "/count", {headers: {
        'Authorization': getAuthToken()
    }})
    .then(res=>{
        return res.data.count;
    })
    .catch(err=>{
        console.log(err);
    })
}

export async function increment() {
    return axios.post(url + "/increment", {},{headers: {
        'Authorization': getAuthToken()
    }})
    .catch(err=>{
        console.log(err);
    })
}

export async function decrement() {
    return axios.post(url + "/decrement", {},{headers: {
        'Authorization': getAuthToken()
    }})
    .catch(err=>{
        console.log(err);
    })
}

export async function getHistory() {
    return axios.get(url + "/history", {headers: {
        'Authorization': getAuthToken()
    }})
    .then(res=>{
        return res.data;
    })
}

export async function login(username:string, password:string) {
    return await axios({
        method:"post",
        url:url + "/auth/login",
        headers: {
            'content-type': 'application/json',
        },
        data:{
                username: username,
                password: password
            }
    })
    .then(res=>{
        
        window.localStorage.setItem(authKey, res.data.token);
        return res;
    })
}

export async function register(username:string, password:string) {
    return await axios({
        method:"post",
        url:url + "/auth/register",
        headers: {
            'content-type': 'application/json',
        },
        data:{
                username: username,
                password: password
            }
    })
}

function getAuthToken() {
    let token = localStorage.getItem(authKey);
    if(token===null) {
        return null;
    }
    return "Bearer " + token;
}