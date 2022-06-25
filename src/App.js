// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Ahome from './components/admin/home/Ahome';
import Uhome from './components/user/Uhome';
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <div className="App">
            <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>      
        <Route path='/uhome' element={<Uhome />}/>      
        <Route path='/ahome' element={<Ahome/>}/>      
        </Routes>
      </Router>
    </div>
  );
}

export default App;
