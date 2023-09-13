import React, { useContext } from 'react'
import './Podecast.scss'
import { AiFillPlayCircle } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext';


const Podecast = ({ setPod, filterdata }) => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className='podecast'>
            {currentUser ? <h1>Made For You {currentUser?.displayName}</h1> : <h1>Tranding Songes</h1>}
            <div className="podecast__Container">


                {(filterdata?.map((item, index) => (
                    <div className="podecast__Card" key={item.id}>

                        <AiFillPlayCircle className='podecast__Card--play' size={50} onClick={() => setPod({
                            image: item.downloadlink[0],
                            name: item.pname,
                            artistName: item.speaker,
                            audioFile: item.downloadlink[2],
                            category: item.category
                        })} />
                        <img src={item.downloadlink[0]} alt="" />
                        <div className="podecast__Card--info">
                            <h3>{item.pname}</h3>
                            <div className="podecast__Card--artist">
                                <img src={item.downloadlink[1]} alt="" />
                                <span>{item.speaker}</span>
                            </div>
                            <p>{item.description}</p>
                        </div>
                    </div>
                )))}




            </div>

        </div>
    )
}

export default Podecast