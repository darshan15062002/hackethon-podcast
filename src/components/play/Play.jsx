import React, { useContext, useEffect, useState } from 'react'
import './Play.scss'
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import musicGIF from "../../img/c6c11d8ba0b9f26caf0a6a8ee3a3e78e.gif"
import { AuthContext } from '../../context/AuthContext';



const Play = ({ pod }) => {
    const { currentUser } = useContext(AuthContext)
    const [audio, setAudio] = useState(new Audio(pod.audioFile));
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState();


    console.log(pod);


    useEffect(() => {
        audio.pause();

        setAudio(new Audio(pod.audioFile));
        // const res = async () => {
        //     await updateDoc(doc(db, "users", res.user.uid), {
        //         playback: arrayUnion({
        //             category:pod.category,
        //             description:pod.d
        //         })

        //     });
        // }

        // currentUser && res()


    }, [pod]);
    useEffect(() => {
        // Set up event listeners for the audio element
        audio.addEventListener('play', () => setIsPlaying(true));
        audio.addEventListener('pause', () => setIsPlaying(false));
        audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
        audio.addEventListener('durationchange', () => setDuration(audio.duration));

        // Clean up event listeners when the component unmounts
        return () => {
            audio.removeEventListener('play', () => setIsPlaying(true));
            audio.removeEventListener('pause', () => setIsPlaying(false));
            audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
            audio.removeEventListener('durationchange', () => setDuration(audio.duration));
        };
    }, [audio]);


    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false)

        } else {
            audio.play();
            setIsPlaying(true)
        }
    };

    const handleProgressChange = (event) => {
        const newTime = event.target.value;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };



    return (
        <div className='play'>
            <div className='play__Left'>
                <img src={pod?.image} alt="song_img" />
                <div className='play__Info'>
                    <p >{pod?.name}</p>
                    <p >{pod?.artistName}</p>
                </div>
            </div>
            <div className='play__middle' >
                <div className='play__middle--icon' >
                    <BiSkipPrevious size={window.innerWidth < 480 ? 30 : 40} />
                    {isPlaying ? <BiPause style={{ height: `${window.innerWidth < 480 ? "30px" : '40px'}`, width: `${window.innerWidth < 480 ? "30px" : '40px'}`, background: 'red', borderRadius: '100%' }} size={window.innerWidth < 480 ? 20 : 30} onClick={togglePlay} />
                        :
                        <BiPlay style={{ height: `${window.innerWidth < 480 ? "30px" : '40px'}`, width: `${window.innerWidth < 480 ? "30px" : '40px'}`, background: 'red', borderRadius: '100%' }} onClick={togglePlay} />}

                    <BiSkipNext size={window.innerWidth < 480 ? 30 : 40} />
                </div>
                <div className='progress_container'>

                    <input type="range" className='progress' min="0" max={duration} value={currentTime} onChange={handleProgressChange} style={{ height: '2px', color: 'red' }} />
                    <audio src={"https://samplelib.com/lib/preview/mp3/sample-3s.mp3"} />

                </div>

            </div>
            <div className="play__Right">
                {isPlaying && <img src='https://wynk.in/_next/static/media/animation.43a00529.svg' alt="" />}
            </div>
            {/* <div>
                < BiLike />
            </div> */}
        </div>
    )
}

export default Play