import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar';

//in typescript we have to define the type of props as well!
interface Props {
    children: React.ReactNode;
}
const Layout = ({children}: Props) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header/>
      <Hero/>
      <SearchBar/>
      <div className='container mx-auto py-10 flex-1'>{children}</div>
      <Footer/>
    </div>
  )
}

export default Layout
