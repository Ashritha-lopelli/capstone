<<<<<<< HEAD
import React from 'react'
import './fproperties.css'
import usefetch from '../../hooks/usefetch'


function Fproperties() {

   const {data, loading, error} = usefetch('http://localhost:3001/api/hotels?featured=true')

  //  const {data, loading, error} = usefetch('https://mystic-api.onrender.com/hotels?featured=true')


    // console.log(data)


  return (

    <>


            <div className="fp">
    
               {loading ? <h2>Loading, Please Wait..</h2> :<>


               {data.map((item)=>(

                <div className="fpitem" key = {item._id}>

                   {item.photo ? <img src={item.photo[0]} alt="" className="fpImg" /> : <> 


                   <img src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1" alt="" className="fpImg" />

                   
                   </>}

                    <span className="fpname">{item.name}</span>
                    <span className="fpcity">{item.city}</span>
                    <span className="fpprice">starting from ${item.cheapestprice}</span>

                    {item.rating && <div className="fprating">
                        <button>{item.rating}</button>
                        <span>Excellent</span>
                    </div>}

                </div>))}

                </>}



                
            </div>
            

    </>


  )
}

=======
import React from 'react'
import './fproperties.css'
import usefetch from '../../hooks/usefetch'
import des1 from '../../Images/destination1.jpg'
import { FaSpinner } from 'react-icons/fa';



function Fproperties() {

   const {data, loading, error} = usefetch('http://localhost:3001/api/hotels?featured=true')

  //  const {data, loading, error} = usefetch('https://mystic-api.onrender.com/hotels?featured=true')


    // console.log(data)


  return (

    <>


            <div className="fp">
    
               {loading ? <div className="loading">
                <FaSpinner className="spinner" />
                <p>Loading...</p>
                </div> :<>


               {data.map((item)=>(

                <div className="fpitem" key = {item._id}>

                   {item.photo ? <img src={item.photo[0]} alt="" className="fpImg" /> : <> 


                   <img src={des1} alt="" className="fpImg" />

                   
                   </>}

                    <span className="fpname">{item.name}</span>
                    <span className="fpcity">{item.city}</span>
                    <span className="fpprice">starting from ${item.cheapestprice}</span>

                    {item.rating && <div className="fprating">
                        <button>{item.rating}</button>
                        <span>Excellent</span>
                    </div>}

                </div>))}

                </>}

                
            </div>
            

    </>


  )
}

>>>>>>> a11b54c4ee3b9de9d6744885d7c2c200b3ea9436
export default Fproperties