import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousel from "../components/Carousel";
const carouselImages = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D", 
  "https://plus.unsplash.com/premium_photo-1673439305009-821f62df6d31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGl6emF8ZW58MHx8MHx8fDA%3D", 
  "https://images.unsplash.com/photo-1606152196365-d1ce5ea838b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBpenphfGVufDB8fDB8fHww", 
  "https://plus.unsplash.com/premium_photo-1683619761468-b06992704398?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8fDB8fHww", 
  "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww", 
  "https://images.unsplash.com/photo-1508736793122-f516e3ba5569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D", 
  "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D", 
  "https://images.unsplash.com/photo-1633997454158-71c87e49cd31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
  "https://images.unsplash.com/photo-1597905733802-7bec89b471b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

function generateRandomCarousel(length, count) {
  let randomArray = [];
  for (let i = 0; i < count; i++) {
      randomArray.push([carouselImages[Math.floor(Math.random() * length-1)]]);
  }
  return randomArray;
}
export default function Home() {
  const [search,setsearch]= useState("");
  const [fooditem, setfooditem] = useState([]);
  const [foodcat, setfoodcat] = useState([]);
  const [carousel, setCarousel]= useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    // console.log(response[0],response[1]);
    setfooditem(response[0]);
    setfoodcat(response[1]);
  };

  useEffect(() => {
    loadData();
    setCarousel(generateRandomCarousel(carouselImages.length, 3));
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
          style={{objectFit: "contain !important"}}
        //   style={{background: "contain", backgroundPosition: "center"}}
        >
        <div className="carousel-inner" id="carousel" >
          <div className="carousel-caption" style={{ zIndex: "10"}}  >
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>{
                  setsearch(e.target.value)
                }}


              />
              {/* <button
                className="btn btn-outline-success text-white"
                type="submit"
              >
                Search
              </button> */}
            </div>
          </div>
            {carousel.map((image, index)=>{

              
              return <div key={"carouselImage"+index} className="carousel-item active" >

              <img
              src={image}
              style={{ filter: "brightness(30%)" , height: "500px", objectFit:"cover"}}
              className="d-block w-100"
              alt="..."
              />
          </div>
            })
            }
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>

      <div className="container">
        {(foodcat.length>0) ? (
          foodcat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {fooditem.length>0 ? (
                  fooditem
                    .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search))
                    .map((filteritems) => {
                      return (
                        <div
                          key={filteritems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            fooditem={filteritems}
                            options={filteritems.options[0]}
                            // foodname={filteritems.name}
                            // imgsrc={filteritems.img}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>""""""</div>
                )}
              </div>
            );
          })
        ) : (
          <div>""""""""</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
