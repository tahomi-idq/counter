import React from "react";
import { useEffect, useState } from "react";
import { authKey, decrement, getCount, getHistory, increment, login, register } from "./modules/CounterClient";
import { Button, ButtonGroup, Card, TextField, List, ListItem } from "@mui/material";

const App = () => {

  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [authorized, setAuthorized] = useState(window.localStorage.getItem(authKey)!==null);
  const [loginValue, setLoginValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [registerLoginValue, setRegisterLoginValue] = useState("");
  const [registerPassValue, setRegisterPassValue] = useState("");

  const [displayUnpermitted, setDisplayUnpermitted] = useState(false);
  const [registerPage, setRegisterPage] = useState(false);

  const incrementClick = function() {
    setDisplayUnpermitted(false);
    increment().then(()=>{
      getCount().then((res)=>{
        setCount(res)
      })
    });
  }

  const decrementClick = function() {
    setDisplayUnpermitted(false);
    decrement().then(()=>{
      getCount().then((res)=>{
        setCount(res)
      })
    });
  } 

  const historyClick = function() {
    setDisplayUnpermitted(false);
    getHistory()
    .then(res=>{
      setHistory(res)
    })
    .catch((e)=>{
      console.log(e.response.status);
            
      if(e.response.status == 403) {
        setDisplayUnpermitted(true);
      }
    })
  }

  const loginUser = function() {
    login(loginValue, passValue)
    .then(res=>{      
      setAuthorized(true)
    }).catch(e=>{
      setErrorMsg(e.response.data.message)
    });
  }

  const registeUser = function() {
    register(registerLoginValue, registerPassValue)
    .then(res=>{      
      setRegisterPage(false)
      setLoginValue(registerLoginValue);
      setPassValue(registerPassValue)
    }).catch(e=>{
      setErrorMsg(e.response.data.message)
    });
  }

  useEffect(()=>{
    setDisplayUnpermitted(false);
    setHistory([]);
    setErrorMsg("");
    setRegisterLoginValue("");
    setRegisterPassValue("");
    if(authorized) {
      getCount().then((res)=>{
        setCount(res)
      })
  
      setInterval(()=>{
        getCount().then((res)=>{
          setCount(res)
        })
      }, 1000)
    }
    
  }, [authorized, registerPage])

  function renderCounter() {
    return <div>
    <h1 style={{
      textAlign:"center"
    }}>{count}</h1>
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap:"10px"
    }}>
    <ButtonGroup>
      <Button variant="contained" className="btn" onClick={incrementClick}>increment</Button>
      <Button variant="contained" onClick={decrementClick}>decrement</Button>
    </ButtonGroup>
    
    <br />
    <Button variant="contained" onClick={historyClick}>Get history</Button>
    {displayUnpermitted?<p style={{color:"red"}}>You have no access to use it</p>:null}
    <List>
      {history.map((counter, index)=>{
        return <ListItem key={index}>Time: {counter.time}, count: {counter.count}</ListItem>
      })}
    </List>
    </div>
    
  </div>
  }

  function renderAuth() {
    return <div>

      <TextField type="text" value={loginValue} onChange={(event)=>{
        setLoginValue(event.target.value);
      }} placeholder="login" />
      <TextField type="text" value={passValue} onChange={(event)=>{
        setPassValue(event.target.value);
      }}  placeholder="password"/>
      <Button variant="contained" onClick={loginUser}>Login</Button>
      <Button variant="contained" onClick={()=>{
        setRegisterPage(true)
      }}>Register</Button>
      
    </div>
  }

  function renderRegisterPage() {

    return <div>

      <TextField type="text" value={registerLoginValue} onChange={(event)=>{
        setRegisterLoginValue(event.target.value);
      }} placeholder="login" />
      <TextField type="text" value={registerPassValue} onChange={(event)=>{
        setRegisterPassValue(event.target.value);
      }}  placeholder="password"/>
      <Button variant="contained" onClick={registeUser}>Register user</Button>
      
    </div>
  }

  return (<Card style={{
    padding: "10px",
    display:"flex",
    gap:"10px",
    flexDirection:"column",
    width: "400px",
    margin:"auto"
  }}>{(registerPage?renderRegisterPage():(
    authorized
  ? renderCounter()
  : renderAuth())
  )
    }
  <div>{errorMsg}</div>  
  <Button variant="contained" onClick={()=>{
    window.localStorage.removeItem(authKey);
    setAuthorized(false);
  }}>Unlogin</Button>
  <Button variant="contained" onClick={()=>{
    setRegisterPage(false);
    setAuthorized(false);
  }}>Login Page</Button>
  </Card>);
};

export default App;