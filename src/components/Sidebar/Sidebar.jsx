import React from 'react'
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { BsFillChatSquareHeartFill } from 'react-icons/bs';
import { FaHistory } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';

import './Sidebar.scss'
import { IconContext } from 'react-icons';


const category = ["Business News",
    "Daily News",
    "Entertainment News",
    " News Commentary",
    "  Politics",
    "Sports News",
    "Tech News"]
const focusONSearch = () => {

    document.getElementById("input1").focus();


}


const Sidebar = () => {

    return (
        <div className='sidebar'>
            <div className="sidebar__Containter">
                <IconContext.Provider value={{ className: "global-class-name" }}>
                    <div className="sidebar__Home">

                        <AiOutlineHome />

                        <span>Home</span>
                    </div>
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