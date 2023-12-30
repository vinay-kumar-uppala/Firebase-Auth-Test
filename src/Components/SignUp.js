import React,{useRef, useState} from 'react'
import { Form,Button, Card, Alert } from 'react-bootstrap';
import { auth } from '../Firebase';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard'
import { Link } from 'react-router-dom';


export default function SignUp() {
    const emailRef=useRef()
    const passwordRef=useRef();
    const confirmPasswordRef=useRef();
    const usenavigate=useNavigate();
    const [userCreated,updateUserState]=useState(null);
    const [error,setError]=useState(null);
   
    function handleSignUp(e){
        e.preventDefault();
        console.log(emailRef.current.value,"---");
        if(passwordRef.current.value===confirmPasswordRef.current.value)
        {
        createUserWithEmailAndPassword( auth,emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateUserState("userCreated")
            //usenavigate("/Dashboard")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("User with this Email Address Already Exists!")
            setError("Email-already-in-use, Kindly use different email !")
        });
        }
        else{
          setError("Password Mismatch!")
        }
         

    }

  return (
    <>
      {userCreated?(
       <Alert key={"success"} variant={"success"}>You are signed in successfully,Please login <Link to="Dashboard" >here</Link></Alert>
      ):
      <Card style={{width:"30rem"}}> 
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {error? <Alert key={"danger"} variant={"danger"}>{error}</Alert>:null}
            <Form >
            <Form.Group id='email' >
                <Form.Label   style={{ textAlign: "left", display: "block" }}>Email </Form.Label>
                <Form.Control type="email"  ref={emailRef} required/>
            </Form.Group>
            <Form.Group id='password'>
                <Form.Label  style={{ textAlign: "left", display: "block" }}>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required/>
            </Form.Group>
            <Form.Group id='passwordConfirm'>
                <Form.Label  style={{ textAlign: "left", display: "block" }}>Confirm Password</Form.Label>
                <Form.Control type="password" ref={confirmPasswordRef} required/>
            </Form.Group>
            <Button className='mt-2 w-100' type="submit" onClick={handleSignUp}>
                Submit
            </Button>
        </Form>
        </Card.Body>
        </Card>}

    </>
  )
}
