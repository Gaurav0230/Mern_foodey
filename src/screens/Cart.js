import React from 'react'
import { Usecart,Usedispatchcart } from '../components/ContextReducer'
import trash from "../trash.svg"

export default function Cart() {

    let data=Usecart()
    let dispatch=Usedispatchcart()

    if(data.length===0){
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The cart is Empty</div>
            </div>
        )
    }
    let totalprice= data.reduce((total,food)=> total+food.price,0)


    const handlecheckout =async()=>{
        let useremail=localStorage.getItem("useremail");
        const response= await fetch("http://localhost:5000/api/Orderdata",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                order_data:data,
                email:useremail,
                order_date: new Date().toDateString()
            })
        });
        console.log("order response: ", response)

        if(response.status===200){
            dispatch({type:"DROP"})
        }
    }




  return (
    <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food,index)=>(
                        <tr>
                            <th scope='row'>{index+1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td><button type='button' className='btn p-0'><img src={trash} alt='delete' onClick={()=>{dispatch({type:"REMOVE",index:index})}}></img></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div><h1 className='fs-2' >Total price: {totalprice}/-</h1></div>
            <div>
                <button className='btn bg-success mt-5' onClick={handlecheckout}>Check out</button>
            </div>
        </div>
    </div>
  )
}
