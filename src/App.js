

import '../src/style/style.scss'
import Login from './pages/Login'
import Register from './pages/Register'


import {
  createBrowserRouter,
  RouterProvider,
  Outlet,

} from "react-router-dom";
import Home from './pages/Home/Home';
import Navbar from './components/navbar/Navbar';
import Addpodcast from './pages/Addpodcast/Addpodcast';



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


    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/addpodcast",
    element: <Addpodcast />,
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
