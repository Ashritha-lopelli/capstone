<<<<<<< HEAD
import React, {useState, useContext} from 'react'
import './reserve.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import usefetch from '../../hooks/usefetch'
import { Searchcontext } from '../../context/searchcontext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom' 
import swal from 'sweetalert';



function Reserve({setopen, hotelid}) {

    //set open is passed as a prop for the modal opening and closing while id is the id for the specific hotel that has been opened.


    const {data, loading, error} = usefetch(`http://localhost:3001/api/hotels/room/${hotelid}`)

    // const {data, loading, error} = usefetch(`https://mystic-api.onrender.com/hotels/room/${hotelid}`)


    console.log(data)


    const [selectedrooms, setselectedrooms] = useState([])


    const handlechange =(e)=>{


        const checked = e.target.checked

        // checks if the checkbox has been selected.

        const value = e.target.value

        setselectedrooms(checked ? [...selectedrooms, value] : selectedrooms.filter((item)=>item !== value))

        // It checks if the checkbox has been checked, gets the value of the checkbox, and updates the selectedrooms state array accordingly. If the checkbox is checked, it adds the room ID to the array, and if the checkbox is unchecked, it removes the room ID from the array.

    }

    // console.log(selectedrooms)

    const {date} = useContext(Searchcontext)



     const getdateinrange = (startDate, endDate)=>{

      // the arguments startdate and enddate are strings representing dates


      const start = new Date(startDate)

      const end = new Date(endDate)

      const dates = new Date(start.getTime())

      let list =[]

      while(dates <= end){

        list.push(new Date(dates).getTime())

        dates.setDate(dates.getDate() +1)
      }

      return list

     }

    //  console.log(getdateinrange(date[0].startDate, date[0].endDate))

    const alldates = getdateinrange(date[0].startDate, date[0].endDate)


    const isAvailable = (roomnumbers)=>{

      const isFound = roomnumbers.unavailabledates.some((dates)=>

        alldates.includes(new Date(dates).getTime())
      )


      return !isFound


    }


    const navigate = useNavigate()

    const [message, setmessage] = useState('')

    const handleclick = async ()=>{

      try{

        await Promise.all(selectedrooms.map(roomid=>{

          // const res = axios.put(`http://localhost:3001/api/rooms/availability/${roomid}`, {dates:alldates})

          const res = axios.put(`https://mystic-api.onrender.com/rooms/availability/${roomid}`, {dates:alldates})


          return res.data
        }))


        // setmessage('Updated Successfully!')

        console.log(message)

        swal("Room Reserved", "Room successfully reserved!", "success")

        .then(() =>{
        setopen(false)

        // setTimeout(()=>{

        //   setmessage('')
 
        //   navigate('/')
      })


      }

      catch(err){

        swal("Failed to Reserve", "Failed to reserve the room!", "error")
        setmessage('Failed to Update!')



      setTimeout(()=>{
        
        setmessage('')


      
      }, 3000)

      }




    }


  return (


    <>


    
        <div className='reserve'>
            <div className="rcontainer">

                <FontAwesomeIcon icon ={faCircleXmark} className= 'rclose' onClick ={()=>setopen(false)}/>

                <span>Select your rooms: </span>

                {data.map((item)=>(

                  <div className="ritem">

                    <div className="info">


                      <div className="rtitle">{item.title}</div>
                      <div className="rdesc">{item.description}</div>
                      <div className="rmax">Max People: <b>{item.maxpeople}</b></div>

                      <div className="rprice">{item.price}</div>
                    </div>


                      <div className="selectedrooms">



                      {item.roomnumbers.map((num)=>(

                        <div className="room">
                        
                            <label>{num.number}</label>

                            <input type ='checkbox' disabled = {!isAvailable(num)} value ={num._id} onChange ={handlechange}/>


                        </div>
                      ))}


                      </div>


                  </div>

                ))}


                

                <button  onClick = {handleclick} className="rbtn"> Reserve now!</button>



                {/* This code is using a logical AND operator to conditionally render an HTML element. */}

                    {/* The first part of the expression, message, is a boolean value that checks whether message is truthy or falsy. If message is falsy (e.g. an empty string), then the expression will evaluate to false and nothing will be rendered. */}

                    {/* On the other hand, if message is truthy (e.g. a non-empty string), then the expression will evaluate to true and the second part of the expression, <h2>{message}</h2>, will be rendered. */}

                    {/* So in short, this code is checking if message is truthy and if so, it renders an h2 element with the contents of message. */}

                


                {/* {message && <h2 style = {{color:'green', fontSize :'120px'}}>{message}</h2>} */}



            </div>

     
        </div>
    
    
    </>





  )
}

=======
import React, {useState, useContext} from 'react'
import './reserve.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import usefetch from '../../hooks/usefetch'
import { Searchcontext } from '../../context/searchcontext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom' 
import swal from 'sweetalert';



function Reserve({setopen, hotelid}) {

    //set open is passed as a prop for the modal opening and closing while id is the id for the specific hotel that has been opened.


    const {data, loading, error} = usefetch(`http://localhost:3001/api/hotels/room/${hotelid}`)

    // const {data, loading, error} = usefetch(`https://mystic-api.onrender.com/hotels/room/${hotelid}`)


    console.log(data)


    const [selectedrooms, setselectedrooms] = useState([])


    const handlechange =(e)=>{


        const checked = e.target.checked

        // checks if the checkbox has been selected.

        const value = e.target.value

        setselectedrooms(checked ? [...selectedrooms, value] : selectedrooms.filter((item)=>item !== value))

        // It checks if the checkbox has been checked, gets the value of the checkbox, and updates the selectedrooms state array accordingly. If the checkbox is checked, it adds the room ID to the array, and if the checkbox is unchecked, it removes the room ID from the array.

    }

    // console.log(selectedrooms)

    const {date} = useContext(Searchcontext)



     const getdateinrange = (startDate, endDate)=>{

      // the arguments startdate and enddate are strings representing dates


      const start = new Date(startDate)

      const end = new Date(endDate)

      const dates = new Date(start.getTime())

      let list =[]

      while(dates <= end){

        list.push(new Date(dates).getTime())

        dates.setDate(dates.getDate() +1)
      }

      return list

     }

    //  console.log(getdateinrange(date[0].startDate, date[0].endDate))

    const alldates = getdateinrange(date[0].startDate, date[0].endDate)


    const isAvailable = (roomnumbers)=>{

      const isFound = roomnumbers.unavailabledates.some((dates)=>

        alldates.includes(new Date(dates).getTime())
      )


      return !isFound


    }


    const navigate = useNavigate()

    const [message, setmessage] = useState('')

    const handleclick = async ()=>{

      try{

        await Promise.all(selectedrooms.map(roomid=>{

          // const res = axios.put(`http://localhost:3001/api/rooms/availability/${roomid}`, {dates:alldates})

          const res = axios.put(`https://mystic-api.onrender.com/rooms/availability/${roomid}`, {dates:alldates})


          return res.data
        }))


        // setmessage('Updated Successfully!')

        console.log(message)

        swal("Room Reserved", "Room successfully reserved!", "success")

        .then(() =>{
        setopen(false)

        // setTimeout(()=>{

        //   setmessage('')
 
        //   navigate('/')
      })


      }

      catch(err){

        swal("Failed to Reserve", "Failed to reserve the room!", "error")
        setmessage('Failed to Update!')



      setTimeout(()=>{
        
        setmessage('')


      
      }, 3000)

      }




    }


  return (


    <>


    
        <div className='reserve'>
            <div className="rcontainer">

                <FontAwesomeIcon icon ={faCircleXmark} className= 'rclose' onClick ={()=>setopen(false)}/>

                <span>Select your rooms: </span>

                {data.map((item)=>(

                  <div className="ritem">

                    <div className="info">


                      <div className="rtitle">{item.title}</div>
                      <div className="rdesc">{item.description}</div>
                      <div className="rmax">Max People: <b>{item.maxpeople}</b></div>

                      <div className="rprice">{item.price}</div>
                    </div>


                      <div className="selectedrooms">



                      {item.roomnumbers.map((num)=>(

                        <div className="room">
                        
                            <label>{num.number}</label>

                            <input type ='checkbox' disabled = {!isAvailable(num)} value ={num._id} onChange ={handlechange}/>


                        </div>
                      ))}


                      </div>


                  </div>

                ))}


                

                <button  onClick = {handleclick} className="rbtn"> Reserve now!</button>



                {/* This code is using a logical AND operator to conditionally render an HTML element. */}

                    {/* The first part of the expression, message, is a boolean value that checks whether message is truthy or falsy. If message is falsy (e.g. an empty string), then the expression will evaluate to false and nothing will be rendered. */}

                    {/* On the other hand, if message is truthy (e.g. a non-empty string), then the expression will evaluate to true and the second part of the expression, <h2>{message}</h2>, will be rendered. */}

                    {/* So in short, this code is checking if message is truthy and if so, it renders an h2 element with the contents of message. */}

                


                {/* {message && <h2 style = {{color:'green', fontSize :'120px'}}>{message}</h2>} */}



            </div>

     
        </div>
    
    
    </>





  )
}

>>>>>>> a11b54c4ee3b9de9d6744885d7c2c200b3ea9436
export default Reserve