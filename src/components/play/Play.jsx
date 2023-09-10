import React, { useEffect, useState } from 'react'
import './Play.scss'
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import musicGIF from "../../img/c6c11d8ba0b9f26caf0a6a8ee3a3e78e.gif"



const Play = ({ pod }) => {

    const [audio, setAudio] = useState(new Audio(pod.audioFile));
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState();
    useEffect(() => {
        audio.pause();

        setAudio(new Audio(pod.audioFile));

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
        } else {
            audio.play();
        }
    };

    const handleProgressChange = (event) => {
        const newTime = event.target.value;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    console.log(window.innerWidth);

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
                    {isPlaying ? <BiPause size={window.innerWidth < 480 ? 30 : 40} onClick={togglePlay} /> : <BiPlay size={window.innerWidth < 480 ? 30 : 40} onClick={togglePlay} />}

                    <BiSkipNext size={window.innerWidth < 480 ? 30 : 40} />
                </div>
                <div className='progress_container'>

                    <input type="range" className='progress' min="0" max={duration} value={currentTime} onChange={handleProgressChange} style={{ height: '2px', color: '#19C2E8' }} />
                    {/* <audio src={"https://samplelib.com/lib/preview/mp3/sample-3s.mp3"} ref={audioRef}></audio> */}

                </div>

            </div>
            <div className="play__Right">
                <img src={musicGIF} alt="" />
            </div>
            {/* <div>
                < BiLike />
            </div> */}
        </div>
    )
}

export default Play