import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {db, firebaseApp} from './firebase';
import './App.css';

function App() {
  const history = useHistory();

  const [chats, setChats] = useState([]);
  const [chatContent, setChatContent] = useState("");

  const [chatCnt, setChatCnt] = useState(0);

  const [targetDocumentId, setTargetDocumentId] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uid, setUid] = useState('');
  const [nickName, setNickName] = useState('Anonymous');
  const [loginStatus, setLoginStatus] = useState(false);


  const login = () => {
    if(email.length < 3) {
      alert('!!!');
      return
    }

    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {

      //find user's nickname who is logged in now.
      const uid = (firebaseApp.auth().currentUser || {}).uid
      if(uid){
        const userInfoRef = db.collection('userInfo');
        userInfoRef.onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          let currentUser = data.filter(x => x.uid === uid);
          setNickName(currentUser[0].nickName);
    
    
        })
        setLoginStatus(true);
        setUid(uid);

        setEmail("");
        setPassword("");

        history.push("/");
      }else{
        alert('error');
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  const logout = () => {
    firebaseApp.auth().signOut();
    setLoginStatus(false);
    setNickName("Anonymous");
  }

  const signUp = () => {
    history.push("/signUp");
  }

  const addDocument = () => {
    db
      .collection('chat')
      .add({
        uid: uid,
        content: chatContent,
        cnt: chatCnt,
        nickName: nickName
      })
      .then((ref) => {
        setChatContent('');
        setChatCnt(cnt => cnt + 1);
      })
    
  }

  const updateDocument = () => {
    const chatRef = db.collection('chat').doc(targetDocumentId);

    chatRef
      .update({
        content: updatedContent 
      })
      .then(() => {
        setTargetDocumentId("");
        setUpdatedContent("");
      })
  }

  const deleteDocument = (documentId) => {
    var txt;
    var r = window.confirm('Press a confirm button!');
    if (r == true) {
      db.collection('chat').doc(documentId).delete().then (() => {})
    } else {
      alert('You canceled')
    }
  }

  useEffect(() => {
    const chatRef = db.collection('chat');
    chatRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (data.length) {
        data.sort((x, y) => {return x.cnt - y.cnt})
        setChatCnt(data[data.length - 1].cnt + 1)
      }
      setChats(data);
      //id, content


    })
  }, [])

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      const uid = (firebaseApp.auth().currentUser || {}).uid
      if(uid){
        setLoginStatus(true);
        setUid(uid);
      }else{
      }
    })
  }, [])

  return (
    <div className="App">

      {
        loginStatus
        ?
        <>
          <div className = "btn btn-danger" onClick = {evt => {logout()}}>Logout</div>
        </>
        :
        <>
          <input className = "default-textarea" value = {email} onChange = {evt => {setEmail(evt.target.value)}} placeholder = "email">

          </input>
          <input className = "default-textarea" value = {password} onChange = {evt => {setPassword(evt.target.value)}} placeholder = "password">
            
          </input>
          <div className = "btn btn-success" onClick = {evt => login()}>Login</div>
          <div className = "btn btn-signUp" onClick = {evt => signUp() }>Sign Up</div>
        </>

      }

      <br/>
      <textarea
        className = "default-textarea"
        value = {chatContent}
        onChange = {evt => {setChatContent(evt.target.value)}}
        placeholder = "type here to add"></textarea>
      <div className = "btn btn-success" value = {chatContent} onClick = {evt => addDocument(evt.target.value)}>Add</div>
      
      <br/>
      <textarea
        className = "default-textarea"
        value = {targetDocumentId}
        onChange = {evt => {setTargetDocumentId(evt.target.value)}}
        placeholder = "document id"></textarea>
      <textarea
        className = "default-textarea"
        value = {updatedContent}
        onChange = {evt => {setUpdatedContent(evt.target.value)}}
        placeholder = "new context"></textarea>
      <div className = "btn btn-success" onClick = {evt => {updateDocument()}}>Update</div>
      <br/>
      
      <br/>
      <br/>
      <br/>
      <hr/>

      {
        chats.map((chat) => {
          return <div onClick = {evt => deleteDocument(chat.id)}>
            {chat.nickName}: {chat.content}
          </div>
        })
      }

    </div>


  );
}

export default App;
