import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './App.css';
import { db, firebaseApp} from './firebase';

function App() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [nickName, setNickName] = useState('');

  const createAccount = () => {
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const uid = (firebaseApp.auth().currentUser || {}).uid;
        db
          .collection('userInfo')
          .add({
            uid: uid,
            emailAddress: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            nickName: nickName
          })
          .then((ref) => {
            console.log(email, password, firstName, lastName, nickName);
            console.log('success to sign up');
            history.push('/');
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
          })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className="App">
      <div className = "btn btn-signUp">First Name</div>
      <input
        className = "default-textarea"
        placeholder = "First name"
        value = {firstName}
        onChange = {evt => {setFirstName(evt.target.value)}}></input>
      <br/>
      <div className = "btn btn-signUp">Last Name</div>
      <input
        className = "default-textarea"
        placeholder = "Last name"
        value = {lastName}
        onChange = {evt => {setLastName(evt.target.value)}}></input>
      <br/>
      <div className = "btn btn-signUp">Email Address</div>
      <input
        className = "default-textarea"
        placeholder = "Email"
        value = {email}
        onChange = {evt => {setEmail(evt.target.value)}}></input>
      <br/>
      <div className = "btn btn-signUp">Password</div>
      <input
        className = "default-textarea"
        placeholder = "password"
        value = {password}
        onChange = {evt => {setPassword(evt.target.value)}}></input>
      <br/>
      <div className = "btn btn-signUp">Nickname</div>
      <input
        className = "default-textarea"
        placeholder = "nickname"
        value = {nickName}
        onChange = {evt => {setNickName(evt.target.value)}}></input>
      <br/>
      <div
        className = "btn btn-success"
        onClick = {evt => {createAccount()}}>Sign Up!</div>
    </div>
  );
}

export default App;
