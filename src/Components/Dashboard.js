import React, { useEffect,useState } from 'react'
import {  Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import auth from '../Firebase.js'
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import firebase from 'firebase/auth'


export default function Dashboard() {
const usenavigate=useNavigate();
const [currentUser, setCurrentUser] = useState(null);

useEffect(()=>{
    const authInstance = getAuth(auth);
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
        if (user) {
          
          setCurrentUser(user);
          
        } else {
            setCurrentUser(null);
      }
    });
    return () => unsubscribe();
},[])

function handleLogin(){
    console.log("login")
    usenavigate("/Login")
}
function handleLogOut(){
    console.log("sign Out")
    const authInstance = getAuth(auth);
    signOut(authInstance).then(() => {
        // Sign-out successful.
        setCurrentUser(null)

      }).catch((error) => {
        // An error happened.
      });
}
  return (
     <>
     {currentUser?(<>
        <Card style={{border:"1px solid grey",width: '50rem',height:'5rem'}}>
            <Card.Body style={{color:"black"}}>Welcome dear {currentUser.email}
            <Button variant="primary" onClick={handleLogOut} style={{marginLeft:"10px"}}>Log Out</Button>
            </Card.Body>
        </Card>
        </>)
        : <Card style={{border:"1px solid grey",width: '50rem',height:'5rem'}}>
        <Card.Body style={{color:"black"}}>Welcome to authentication platform
        <Button variant="primary" onClick={handleLogin} style={{marginLeft:"10px"}}>Log In</Button>
        </Card.Body>
    </Card>}
        </>
  )
}
