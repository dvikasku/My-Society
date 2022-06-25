import Sidebar from '../../sidebar/Sidebar'
import Navbar from '../../navbar/Navbar'
import Widget from '../../widget/Widget'
import Table from '../../notices/Table'
import "./home.scss"
import React, { useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

const Ahome = (props) => {
  const navigate = useNavigate()
  const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem('token')
    // console.log(props.state.role)
		if (token) {
    // const user = await response.json()
			if (location.state.role !== 1) {
				localStorage.removeItem('token')
				navigate('/login')
			}
		}
    else{
      localStorage.removeItem('token')
      navigate('/login')
    }
	}, [])

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="table">
          <div className="notices">
            <h1>Notices</h1>
          <Table />
          </div>
          {/* Complain
          <Table /> */}
        </div>
      </div>
    </div>
  )
}

export default Ahome