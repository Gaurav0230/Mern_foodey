import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { Usecart } from './ContextReducer';


export default function Navbar() {
  let data= Usecart()

  const [cartview,setcartview]= useState(false);
  
  const navigate= useNavigate();


  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }



  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-2 fst-italic" to="/">Foodie</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken"))?
          <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">My order</Link>
        </li>
        : ""

        }



      </ul>


        {!(localStorage.getItem("authToken"))?
      <div className='d-flex'>
        
        <Link className="btn bg-white text-success mx-2" to="/login">Login</Link>
        
        <Link className="btn bg-white text-success mx-2" to="/signup">Signup</Link>
        
      </div>
      :
      <div>
      <div className='btn bg-white text-success mx-2 ' onClick={()=>{setcartview(true)}}>My cart  <Badge pill bg="danger" >{data.length}</Badge>
       </div>

        {cartview?<Modal onclose={()=>{setcartview(false)}}><Cart/></Modal>:null}

      <div className='btn bg-danger text-white mx-2 ' onClick={handleLogout}>Logout</div>
      </div>
      }
    </div>
  </div>
</nav>
    </div>
  )
}
