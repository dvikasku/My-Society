import Sidebar from '../../sidebar/Sidebar'
import Navbar from '../../navbar/Navbar'
import "./home.scss"

const Ahome = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        Container
      </div>
    </div>
  )
}

export default Ahome