import Sidebar from '../../sidebar/Sidebar'
import Widget from '../../widget/Widget'
import Table from '../../notices/Table'
import "./home.scss"
import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/auth'

const Ahome = (props) => {
  const navigate = useNavigate()
  const auth = useAuth()

	useEffect(() => {
		const token = localStorage.getItem('token')
    // console.log(auth.user)
		if (token) {
			if (auth.user.role !== 1) {
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