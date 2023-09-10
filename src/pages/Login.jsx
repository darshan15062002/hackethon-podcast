import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Login = () => {
  const navigate = useNavigate()
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()


    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email);

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')

    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  const provider = new GoogleAuthProvider()
  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(async (result) => {

      console.log(result);
      // //Update profile
      // await updateProfile(res.user, {
      //   displayName: name,
      //   photoURL: downloadURL,

      // });
      const res = await getDoc(doc(db, "users", result.user.uid))
      if (!res.exists()) {
        //create user on firestore
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,

          photoURL: result.user.photoURL,
        });

        navigate("/");
      }
      navigate("/");






      navigate('/')
    }).catch((err) => {
      setErr(true)
    })
  }
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">ZED Talks</span>
        <span className="title">Login</span>


        <div className="google-Auth">
          <button onClick={handleGoogle}> <img src="	https://accounts.scdn.co/sso/images/google-icon.1cdc8fce9609d07f0e9d8d0bc4b61f8f.svg" alt="" /> Continue with Google</button>
        </div>
        <div className="horizontal">

          <span>OR</span>


        </div>
        <form onSubmit={handleSubmit} >

          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />


          <button >Login</button>
          {err && <span>Something Went Wrong !</span>}
        </form>
        <p> Don't have an account ? <Link to='/register'>Register</Link></p>
      </div>

    </div>
  )
}

export default Login
