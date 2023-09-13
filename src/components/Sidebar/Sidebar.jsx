import React from 'react'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { BsFillChatSquareHeartFill } from 'react-icons/bs';
import { FaHistory } from 'react-icons/fa';
import { BiCategory, BiFace } from 'react-icons/bi';

import './Sidebar.scss'
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';


const category = [
    "Pop Song",
    "Rock Song",
    "Hip hop Song",
    "  Romantic Song",
    "Classical Song",
    "Metal Songe"]
const focusONSearch = () => {

    document.getElementById("input1").focus();


}


const Sidebar = () => {

    return (
        <div className='sidebar'>
            <div className="sidebar__Containter">
                <IconContext.Provider value={{ className: "global-class-name" }}>
                    <Link to="/" className="sidebar__Home" style={{ textDecoration: 'none', color: 'white' }}>

                        <AiOutlineHome />

                        <span>Home</span>
                    </Link>
                    <Link to="/facedetection" className="sidebar__Home" style={{ textDecoration: 'none', color: 'white' }}>
                        <BiFace />
                        <span>Face Detection</span>
                    </Link>
                    <div className="sidebar__Home" onClick={focusONSearch}>
                        <AiOutlineSearch />
                        <span>Search</span>
                    </div>

                    <div className="sidebar__Home">
                        <BsFillChatSquareHeartFill />
                        <span>Like Podecast</span>
                    </div>
                    <div className="sidebar__Home">
                        <FaHistory />
                        <span>Hisory</span>
                    </div>
                    <div className="sidebar__Category">
                        <BiCategory />
                        <span>Category</span>
                    </div>
                    <div className="sidebar__Catogory--item">
                        {
                            category.map((item, index) => (
                                <span>{item}</span>
                            ))
                        }
                    </div>

                </IconContext.Provider>
            </div>
        </div>
    )
}

export default Sidebar