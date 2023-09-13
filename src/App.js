

import '../src/style/style.scss'
import Login from './pages/Login'
import Register from './pages/Register'
import { Suspense, lazy } from 'react';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,

} from "react-router-dom";
import Home from './pages/Home/Home';
import Navbar from './components/navbar/Navbar';
import Addpodcast from './pages/Addpodcast/Addpodcast';
const FaceDetection = lazy(() => import('./pages/FaceDetaction/FaceDetection'))




// import { useContext } from 'react'
// import { AuthContext } from './context/AuthContext'




const Layout = () => {

  return (
    <div className="app">
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}


// const ProtectedRoute = ({ children }) => {
//   const { currentUser } = useContext(AuthContext)
//   const [user, setUser] = useState({})
//   console.log(user);
//   useEffect(() => {
//     const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
//       setUser(doc.data())
//     });

//     return () => {
//       unsub()
//     }
//   }, [])



//   if (user.isAdmin === true) {
//     return <Navigate to='/login' />
//   }
//   return children
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/facedetection",
        element: <Suspense> <FaceDetection /></Suspense>,
      },



    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/addsonges",
    element: <Addsonges />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);



function App() {


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
