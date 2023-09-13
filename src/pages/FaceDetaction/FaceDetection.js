import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from "face-api.js";
import './FaceDetection.css'



function FaceDetection() {
    const videoRef = useRef();
    const canvasRef = useRef();
    const [on, setOn] = useState(false)
    const [mood, setMood] = useState({})
    useEffect(() => {
        startVideo();

        videoRef && loadModels();

    }, [on]);

    const loadModels = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]).then(() => {
            faceDetection();
        })
    };

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((currentStream) => {
                videoRef.current.srcObject = currentStream;
            })
            .catch((err) => {
                console.error(err)
            });
    }


    const faceDetection = async () => {
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);
            faceapi.matchDimensions(canvasRef.current, {
                width: 940,
                height: 650,
            })

            const resized = faceapi.resizeResults(detections, {
                width: 940,
                height: 650,
            });

            faceapi.draw.drawDetections(canvasRef.current, resized)
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
            faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
            console.log(detections[0].expressions, "detection ");
            setMood(detections[0].expressions)
        }, 1000)

    }

    const toggle = () => {

        console.log(on);
        setOn((prev) => !prev)
    }
    return (
        <div className="face">
            <h1> AI FACE DETECTION</h1>
            <span>{mood?.neutral}</span>

            <div className='app__video'>
                <video crossOrigin='anonymous' ref={videoRef} autoPlay />

            </div>
            <canvas ref={canvasRef} width="940" height="650" className='app__canvas' />
            <button className='btn' onClick={toggle}>Check Your Mood</button>
        </div>
    )
}

export default FaceDetection