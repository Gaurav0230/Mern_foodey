import React, { useEffect, useRef, useState } from "react";
import { Usedispatchcart, Usecart } from "./ContextReducer";
export default function Card(props) {
  let dispatch=Usedispatchcart();
  let data= Usecart();

  let options=props.options
  let priceoptions= Object.keys(options)

  const [qty,setqty]=useState(1)
  const [size,setsize]=useState("")

  const handleaddtocart=async()=>{

    let food=[]
    for(const item of data){
      if(item.id===props.fooditem._id){
        food=item
        break
      }
    }
    if(food !== []){
      if(food.size === size){
        await dispatch({ type:"UPDATE", id:props.fooditem._id, price:finalprice, qty:qty })
        return
      } 
      else if(food.size !==size){
        await dispatch({type:"ADD", id:props.fooditem._id, name:props.fooditem.name, price:finalprice, qty:qty, size:size})
        return

      }
      return
    }
    await dispatch({type:"ADD", id:props.fooditem._id, name:props.fooditem.name, price:finalprice, qty:qty, size:size})


    // await dispatch({type:"ADD", id:props.fooditem._id, name:props.fooditem.name, price:finalprice, qty:qty, size:size})
    // await console.log(data)
  }


  const priceref=useRef();
  let finalprice = qty * parseInt(options[size]);

  useEffect(()=>{
    setsize(priceref.current.value)
  },[])

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "500px" }}
        >
          <img src={props.fooditem.img} className="card-img-top" alt="..." style={{height:"200px" , objectFit:"fill"}} />
          <div className="card-body">
            <h5 className="card-title">{props.fooditem.name}</h5>
            {/* <p className="card-text">something about the dishes wanna know</p> */}
            <div className="container w-100">
              <select className="m-2 h-100 bg-success" onChange={(e)=> setqty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}{" "}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceref} onChange={(e)=> setsize(e.target.value)}>
                {priceoptions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5">
              ₹{finalprice}/-
              </div>
            </div>
            <hr/>
            <button className="btn btn-success justify-center ms-2" onClick={handleaddtocart}>add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
