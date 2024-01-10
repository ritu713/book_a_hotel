import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Layout from './layouts/Layout'
import Register from './pages/Register'
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout children="Home page"/>}/>
      <Route path="/search" element={<Layout>Search Page</Layout>}/>
      <Route path="/register" element ={<Layout><Register/></Layout>}/>4
      <Route path="/login" element={<Layout> <Login/> </Layout>} />
      <Route path='*' element={<Navigate to ="/" />} />
      
    </Routes>
  )
}

export default App
