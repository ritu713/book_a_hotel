import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from './layouts/Layout'
import LoginLayout from "./layouts/LoginLayout";
import Register from './pages/Register'
import Login from "./pages/Login";
import AddHotel from "./pages/AddHotel";
import MyHotels from './pages/MyHotels'
import { useAppContext } from "./contexts/AppContext";
import EditHotel from "./pages/EditHotel";
import Search from './pages/Search'

function App() {
  const {isLoggedIn} = useAppContext();
  return (
    <Routes>
      <Route path='/' element={<Layout children="Home page"/>}/>
      <Route path="/search" element={<Layout><Search/></Layout>}/>
      <Route path="/register" element ={<LoginLayout> <Register/> </LoginLayout>}/>
      <Route path="/login" element={<LoginLayout> <Login/> </LoginLayout>} />
      
      {isLoggedIn && <>
        <Route path='/add-hotel' element={<Layout><AddHotel/></Layout>}/>
        <Route path="/edit-hotel/:hotelID" element={<Layout><EditHotel/></Layout>}/>
        <Route path="/my-hotels" element={<Layout><MyHotels/></Layout>}/>
        
      </>}
      <Route path='*' element={<Navigate to ="/" />} />
      
    </Routes>
  )
}

export default App
