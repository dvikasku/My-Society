import Sidebar from '../../sidebar/Sidebar'
import Navbar from '../../navbar/Navbar'
import Widget from '../../widget/Widget'
import Table from '../../notices/Table'
import "./home.scss"

const Ahome = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="table">
          Notices
          <Table />
          {/* Complain
          <Table /> */}
        </div>
      </div>
    </div>
  )
}

export default Ahome