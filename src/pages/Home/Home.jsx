import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import '../Home/Home.scss'
import Podecast from '../../components/Podecast/Podecast'
import Play from '../../components/play/Play'
import { db } from "../../firebase";
import { collection, collectionGroup, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { SearchContext } from '../../context/SearchContext'




const Home = () => {
    const [pod, setPod] = useState()
    const [filterdata, setFilterData] = useState([])
    const [services, setServices] = useState([])
    const { search, setSearch } = useContext(SearchContext);
    console.log(search);

    useEffect(() => {
        const handleSubmit = async () => {


            setServices(filterdata.filter((doc) => {
                return doc.pname?.toLowerCase().includes(search?.toLowerCase())
                // comparing category for displaying data
            }))


        }
        search && handleSubmit()
    }, [search])





    useEffect(() => {
        const getServices = async () => {
            const q = query(collection(db, "podcast"));

            const querySnapshot = await getDocs(q);

            var userDocs = [];
            querySnapshot.forEach((doc) => {


                userDocs.push(doc.data().podcast);


                // array of documents for all users

            })
            console.log(userDocs.flat());
            setFilterData(userDocs.flat())





            return () => {
                querySnapshot()
            }
        }
        getServices()

    }, [])



    return (
        <div className='home'>
            <div className="home__main">
                <Sidebar />
                <Podecast setPod={setPod} filterdata={services.length === 0 ? filterdata : services} />
            </div>

            {pod && <Play pod={pod} />}

        </div>
    )
}

export default Home