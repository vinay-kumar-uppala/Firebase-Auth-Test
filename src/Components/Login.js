import React, { useRef, useState } from 'react'
import { Form,Button, Card, Alert } from 'react-bootstrap';
import { auth } from '../Firebase';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard'
import { Link } from 'react-router-dom';
import SignUp from './SignUp';

export default function Login() {
    const emailRef=useRef()
    const passwordRef=useRef();
    const [error,setError]=useState(null);
    const usenavigate=useNavigate();

    function handleLogin(e){
        e.preventDefault();
        console.log(emailRef.current.value,"---");
         signInWithEmailAndPassword( auth,emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            usenavigate("/Dashboard")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,"--",errorMessage)
            setError("errorInLogin")
        });

    }

  return (
    <>
        <Card style={{width:"30rem"}}> 
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                {error?<Alert variant={'danger'} key={'danger'} >Sorry, your password was incorrect. Please double-check your password.</Alert>:null}
            <Form >
            <Form.Group id='email' >
                <Form.Label   style={{ textAlign: "left", display: "block" }}>Email </Form.Label>
                <Form.Control type="email"  ref={emailRef} required/>
            </Form.Group>
            <Form.Group id='password'>
                <Form.Label  style={{ textAlign: "left", display: "block" }}>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required/>
            </Form.Group>
            <Button className='mt-2 w-100' type="submit" onClick={handleLogin}>
                Submit
            </Button>
        </Form>
        <div className='w-100 text-center mt-2' style={{color:"black"}}> Don't have an account? <Link to="/SignUp">Sign Up</Link></div>
        </Card.Body>
        </Card>
       
    </>
  )
}
