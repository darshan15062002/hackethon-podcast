import React from 'react'
import './Podecast.scss'
import { AiFillPlayCircle } from 'react-icons/ai';


const Podecast = ({ setPod, filterdata }) => {

    return (
        <div className='podecast'>
            <h1>Most Popular</h1>
            <div className="podecast__Container">


                {(filterdata?.map((item, index) => (
                    <div className="podecast__Card" key={item.id}>

                        <AiFillPlayCircle className='podecast__Card--play' size={50} onClick={() => setPod({
                            image: item.downloadlink[0],
                            name: item.pname,
                            artistName: item.speaker,
                            audioFile: item.downloadlink[2]
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