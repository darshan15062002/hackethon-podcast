import React, { useContext, useState } from 'react'
import logo from '../../img/logo.jpeg'
import '../navbar/Navbar.scss'
import searchs from '../../img/search.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, onSnapshot, query } from 'firebase/firestore'
import { SearchContext } from '../../context/SearchContext'
const Navbar = () => {

    const [menu, setMenu] = useState(false)
    const [user, setUser] = useState({})
    const { currentUser } = useContext(AuthContext)
    const { search, setSearch } = useContext(SearchContext);
    const [query, setQuery] = useState('')





    console.log(currentUser);
    const handleManu = () => {
        setMenu(!menu)
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            setUser(doc.data())
        });

        return () => {
            unsub()
        }
    }



    return (
        <div className='navbar'>
            <div className="navbar-Container">
                <div className="navbar-Left">
                    <img src={logo} alt="" />
                    <span>HarmonyHub</span>
                </div>
                <div className="navbar-Middle">

                    <input maxlength="800" id='input1' placeholder="What do you want to listen to?" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => setSearch(e.target.value)} />
                    <img src={searchs} alt="" />
                </div>
                {currentUser ? (
                    <div className="user" onClick={handleManu}>
                        <img src={currentUser.photoURL} alt="" />
                        <span>{currentUser?.displayName}</span>
                        {menu && <div className="options">

                            {user?.isAdmin && <Link className="link" to="/addsonges">
                                Add Songes
                            </Link>}
                            <p className="link" to="/">
                                <button onClick={() => signOut(auth)}>Logout</button>

                            </p>
                        </div>}
                    </div>) : (<div className="navbar-Right">
                        <Link to={'/register'} className='navbar_Signup'><span>Sign Up</span></Link>
                        <Link to={'/login'} className='navbar-Login'><span>Log in</span></Link>
                    </div>)}
            </div>
        </div>
    )
}

export default Navbar
