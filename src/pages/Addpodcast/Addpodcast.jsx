import React, { useContext, useEffect, useRef, useState } from 'react'
import '../Addpodcast/Addpodcast.scss'
import edit from '../../img/pencil.png'
import { db, storage } from '../../firebase'
import { BiArrowBack } from 'react-icons/bi'
import Mic from '../../img/microphone-svgrepo-com.svg'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Timestamp, arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { AuthContext } from '../../context/AuthContext'
import { v4 as uuid } from 'uuid'

import { useNavigate } from 'react-router-dom'

const Addpodcast = () => {
    const navigate = useNavigate()
    const formRef = useRef(null);
    const { currentUser } = useContext(AuthContext)

    const [img, setImg] = useState()
    const [img2, setImg2] = useState()

    const [services, setServices] = useState([])



    // fatch prve sevices
    useEffect(() => {




        const getServices = () => {
            const unsub = onSnapshot(doc(db, "podcast", currentUser?.uid), (doc) => {
                setServices(doc.data()?.podcast)
            });

            return () => {
                unsub()
            }
        }
        currentUser && getServices()

    }, [currentUser])





    const handleSubmit = async (e) => {
        e.preventDefault()
        const podcastUrl = e.target[0].files[0];
        const pname = e.target[1].value;
        const description = e.target[2].value;
        const category = e.target[3].value;
        const photoURL = e.target[4].files[0];
        const speaker = e.target[5].value;
        const audioUrl = e.target[6].files[0];
        var uploadfile = [podcastUrl, photoURL, audioUrl]

        console.log(podcastUrl);
        try {
            const date = new Date().getTime();
            const storageRefs = uploadfile.map((file) => {
                return ref(storage, `pod/${file.name + date}`);
            });

            // Upload all files in parallel
            await Promise.all(
                storageRefs.map((storageRef, index) => {
                    return uploadBytesResumable(storageRef, uploadfile[index]);
                })
            );

            // Get all download URLs in parallel
            const dowURLPromises = storageRefs.map((storageRef) => {
                return getDownloadURL(storageRef);
            });
            const dowURL = await Promise.all(dowURLPromises);
            alert('Services is added succesfully');
            // Update Firestore document
            const res = await getDoc(doc(db, "podcast", currentUser.uid));
            if (!res.exists()) {
                await setDoc(doc(db, "podcast", currentUser.uid), { podcast: [] });
            }
            await updateDoc(doc(db, "podcast", currentUser.uid), {
                podcast: arrayUnion({
                    id: uuid(),
                    downloadlink: dowURL,
                    pname,
                    description,
                    category,
                    speaker,
                    date: Timestamp.now(),
                })
            });
            alert('Services is added succesfully');
            e.target.reset();
        } catch (err) {
            console.log(err, "dars");
        }
    };






    return (
        <div className='formContainer' >
            <BiArrowBack size={40} style={{ color: 'white', padding: "10px", position: 'absolute', top: "20px", left: "20px", background: '#19C2E8', borderRadius: '100%' }} onClick={() => navigate('/')} />
            <div className="formWrapper formWrapper__col" style={{ gap: '60px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="logo">HarmonyHub</span>
                    <span className="title">Create Songe</span>
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <input type="file" name='file3' id='file3' onChange={(e) => setImg2(e.target.files[0])} />
                        <label htmlFor="file3" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} ><img src={img2 ? URL.createObjectURL(img2) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} style={{ height: '120px', width: '100%' }} alt="" />
                        </label>
                        <input type="text" name='name' placeholder='Enter name of music' />
                        <input type="textarea" name='description' placeholder='Description' />
                        <input type="text" name='category' placeholder='Category' />
                        <div style={{ display: 'flex', borderBottom: "1px solid black" }}>
                            <input type="file" name='file2' id='file2' onChange={(e) => setImg(e.target.files[0])} />
                            <label htmlFor="file2" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} ><img src={img ? URL.createObjectURL(img) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} style={{ height: '30px', width: '30px', borderRadius: "100%" }} alt="" />
                            </label>
                            <input type="text" name='speaker' placeholder='Singer' style={{ border: 'none' }} />
                        </div>

                        <input type="file" name='file' id='file' />
                        <label htmlFor="file" style={{ display: 'flex', alignItems: 'center', gap: '10px' }} >

                            <img src={Mic} alt="" style={{ height: '30px', width: '30px', }} />
                            <p>Add audio here</p>
                        </label>






                        <button>ADD</button>

                    </form>
                </div>


                <div className="right">

                    <h2>Previously added Songes</h2>
                    <div className="service-list">
                        {services !== 0 ? services?.map((item, index) => (


                            <div key={item?.id} className="service-card">
                                <img src={item?.downloadlink[0]} alt='' />
                                <div className="card-info">
                                    <h3>{item?.pname}</h3>
                                    <p>{item?.description}</p>
                                    <span> {item?.category} </span>
                                </div>
                                {/* <div className="edit" onClick={() => handleEdit(item.topic, item.description, item.photoURL, item.price, item.userId)}> */}
                                <div className="edit">
                                    <img src={edit} alt="" />
                                </div>
                            </div>

                        )) : <h1>Loading....</h1>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addpodcast