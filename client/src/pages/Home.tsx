import Navbar from '../components/Navbar'
import Heropage from '../components/Heropage'
import Footer from '../components/Footer'
import Homepage from '../components/Homepage'

const Home = () => {
  return (
    <>
    <div className=''><Navbar /></div>
    <div><Heropage /></div>
    <div className=''><Homepage/></div>
    <div><Footer /></div>
    </>
  )
}

export default Home
