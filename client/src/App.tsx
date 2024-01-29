import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from './layouts/Layout'
import Register from './pages/Register'
import Login from "./pages/Login";
import AddHotel from "./pages/AddHotel";
import MyHotels from './pages/MyHotels'
import { useAppContext } from "./contexts/AppContext";

function App() {
  const {isLoggedIn} = useAppContext();
  return (
    <Routes>
      <Route path='/' element={<Layout children="Home page"/>}/>
      <Route path="/search" element={<Layout>Search Page</Layout>}/>
      <Route path="/register" element ={<Layout><Register/></Layout>}/>4
      <Route path="/login" element={<Layout> <Login/> </Layout>} />
      {isLoggedIn && <>
        <Route path='/add-hotel' element={<Layout><AddHotel/></Layout>}/>
      </>}
      {isLoggedIn && <>
        <Route path="/my-hotels" element={<Layout><MyHotels/></Layout>}/>
      </>}
      <Route path='*' element={<Navigate to ="/" />} />
      
    </Routes>
  )
}

export default App
