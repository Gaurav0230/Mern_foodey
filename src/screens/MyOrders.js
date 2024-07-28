import { useLayoutEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Navigate } from 'react-router-dom';

export default function MyOrders (){
    const [orders, setOrders] = useState([]);
    
    useLayoutEffect(()=>{
        async function fetchOrder(){
            let useremail=localStorage.getItem("useremail");
            if(!useremail){
                Navigate("/login", true);
                
            }else{
                const response = await fetch(`http://localhost:5000/api/getOrders?email=${useremail}`);
                const data = await response.json();
                setOrders(data);
            }
        }
        fetchOrder();

    },[])
    console.log("Orders ", orders)
    return <section>
        <Navbar />

        <div className="container mt-5">
        <h1 >My Orders</h1>
            {orders.length==0 && <h6 className="pt-5 mx-auto"> No Orders available</h6>}
      <div className="row pt-4">
        {orders.map(order => (
          <div key={order._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{order.name}</h5>
                <p className="card-text">Quantity: {order.qty}</p>
                <p className="card-text">Size: {order.size}</p>
                <p className="card-text">Price: ₹{order.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
        <Footer/>
    </section>
}