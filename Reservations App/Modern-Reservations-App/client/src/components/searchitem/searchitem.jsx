import React from 'react'
import './searchitem.css'
import {Link} from 'react-router-dom'

function Searchitem({items}) {



  return (

    <>
    

    {/* {items.photos[0]} */}


    <div className='searchitem'>

        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1" alt="" className="simg" />

        <div className="sdesc">

            <h1 className="stitle">{items.name}</h1>
            <span className="sdistance">{items.distance}</span>
            <span className="staxi">Free airport taxi</span>
            <span className="subtitle">Studio Apartment with Air conditioning</span>
            <span className="sfeatures">{items.description}</span>
            <span className="cancel">Free Cancellation</span>
            <span className="cancelsubtitle">
                You can cancel later, so look in this great price today!
            </span>



        </div>


        <div className="sdetails">

            {items.rating && <div className="srating">
                    <span>Excellent</span>
                    <button>{items.rating}</button>
                </div>}

            <div className="detailstext">
                <span className="sprice">${items.cheapestprice}</span>
                <span className="staxi">Includes taxes and fees</span>

                <Link to ={`/hotels/${items._id}`}>
                <button className="scheckbutton">See availability</button>
                </Link>

                {/* the button will direct you to the single property page of the specific hotel using its id. */}

            </div>


        </div>


    </div>



    </>
  )
}

export default Searchitem