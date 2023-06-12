import React, {useState, useEffect, useContext} from 'react'
import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Mail from '../../components/maillist/maillist'
import Footer from '../../components/footer/footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationDot, faCircleXmark, faCircleArrowLeft, faCircleArrowRight} from '@fortawesome/free-solid-svg-icons'
import usefetch from '../../hooks/usefetch'
import {useLocation} from  'react-router-dom'
import { Searchcontext } from '../../context/searchcontext'
import { Authcontext } from '../../context/authcontext'
import {useNavigate} from 'react-router-dom'
import Reserve from '../../components/reserve/reserve'


function Hotel() {

  const location = useLocation()

  //the uselocation hook is used to give details about the page you are in.


  // console.log(location)

  const [id, setid] =useState()

  useEffect(()=>{

    const id = location.pathname.split('/')[2]
    setid(id)

  },[location.pathname])


  // console.log(id)

  const [slideindex, setslideindex] = useState(0)
  const [open, setopen] = useState(false)


  const {data, loading, error} = usefetch(`http://localhost:3001/api/hotels/find/${id}`)


  // const {data, loading, error} = usefetch(`https://mystic-api.onrender.com/hotels/find/${id}`)


  console.log(data)


  const {date, options } = useContext(Searchcontext)

  console.log(date)


    //code for getting the number of days between two dates


    const days = 1000 * 60 * 60 * 24

    //milliseconds_per_day

    function daydiff(date1, date2){

      const timediff = Math.abs(date2.getTime() - date1.getTime())

      //subtracts starting date from end date

      const diffdays = Math.ceil(timediff / days)

      return diffdays
    }

    // console.log(daydiff(date[0].endDate, date[0].startDate ))

    const daysbtn = daydiff(date[0].endDate, date[0].startDate )






  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];


  const Handleopen =(i) =>{
    setopen(true)
    setslideindex(i)
  }

  const handlemove = (direction)=>{

    let newslideindex

    if(direction === 'l'){

      newslideindex = slideindex === 0 ? 5 : slideindex-1

    }
    else{

      newslideindex = slideindex === 5? 0 : slideindex+1
    }

    setslideindex(newslideindex)
  }


  // if(!id){

  //   return <div>Loading...</div>
  // }


  //has a slight error when i refresh the page, the content disappears

  const [openmodal, setopenmodal] =useState(false)

  const {user} = useContext(Authcontext)

  const navigate = useNavigate()



  const handlelogin =()=>{

    if (user){

      //if user is available, open the modal page to show the rooms

      setopenmodal(true)

    }

    else{

      navigate('/login')

      //if user is not available redirect user to login page
    }


  }
  
  


  return (

    <>
    
    {loading ? (
      
      <h2>Loading, Please Wait...</h2>) : data ? (

      <>

      <div>
        <Navbar/>
        <Header type ='list'/>
      </div>


       <div className='hotelcontainer'>

        {open && <div className='slider'>


          <FontAwesomeIcon icon = {faCircleXmark} className ='close' onClick = {()=> setopen(false)}/>
          <FontAwesomeIcon icon = {faCircleArrowLeft} className ='arrow' onClick={()=>{handlemove('l')}}/>

          <div className="sliderwrapper">
            <img src={data.photos[slideindex]} alt="" className="sliderimg" />
          </div>
          <FontAwesomeIcon icon = {faCircleArrowRight} className ='arrow' onClick={()=>{handlemove('r')}}/>


        </div>}

        <div className="hotelwrapper">
          <button className="booknow" onClick = {handlelogin}>Reserve or Book Now!</button>
          <h1 className="hoteltitle">{data.name}</h1>
          <div className="hoteladdress">

            <FontAwesomeIcon icon = {faLocationDot}/>
            <span>{data.address}.</span>

          </div>

            <span className="hoteldistance">
             {data.distance}
            </span>

            <span className="hotelpricehighlight">
              Book a stay over ${data.cheapestprice} at this property and get a free airport taxi.
            </span>

            <div className="hotelimages">

              {data.photos?.map((photo,i)=>(
                <div className="hotelimagewrapper">
                  <img onClick ={()=>Handleopen(i)}  src={photo} alt ='' className ='img'/>
                </div>

                  //whenever we click an image  we update our state and give its index
              ))}

            </div>

            <div className="hoteldetails">

              <div className="hoteldetailstext">

                <h1 className="hoteltitle">{data.title}</h1>
                <p className="hoteldesc">

                {data.description}
                </p>

              </div>

              <div className="hoteldetailsprice">

                <h1>Perfect for a {daysbtn}-night stay!</h1>


                <span>Located in the real heart of Krakow, this property has an excellent location score of 9.8!</span>

                <h2>
                  <b>${daysbtn * data.cheapestprice * options.room }</b> ({daysbtn} nights)
                </h2>

                <button onClick = {handlelogin} >Reserve or Book now!</button>


              </div>

            </div>

                <Mail/>
                <Footer/>

        </div>

              {openmodal && <Reserve setopen={setopenmodal} hotelid = {id}/>}


      </div>




    </>

      ) :(

        <h2>An error occurred while fetching the data</h2>

  )}

  </>

    

  )
}

export default Hotel