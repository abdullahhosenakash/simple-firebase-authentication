import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const { photoURL, displayName, email, uid } = user;
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleSignInButton = provider => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
      })
      .catch(error => console.error(error));
  }
  const handleSignOutButton = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      })
  }
  return (
    <div className="App">
      {
        uid ?
          <button onClick={handleSignOutButton}>Sign out</button>
          :
          <>
            <button onClick={() => handleSignInButton(googleProvider)}>Google Sign in</button>
            <button onClick={() => handleSignInButton(githubProvider)}>Github Sign in</button>
          </>
      }
      <br />
      <img src={photoURL} alt="" />
      <h2>Name: {displayName}</h2>
      <h4>Email: {email}</h4>
    </div>
  );
}

export default App;
