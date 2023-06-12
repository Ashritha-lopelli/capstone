import React, {useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import './list.css'
import {useLocation} from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns';
import Searchitem from '../../components/searchitem/searchitem'
import usefetch from '../../hooks/usefetch'




function List() {

  const location = useLocation()

  // console.log(location)
  // all the data from the search bar in the home page will be carried to this page as an object

  const [destination, setdestination] = useState(location.state.destination)
  const [opendate, setopendate] = useState(false)
  const [date, setdate] = useState(location.state.date)
  const [options, setoptions] = useState(location.state.options)
  const [minprice, setminprice] = useState(undefined)
  const [maxprice, setmaxprice] = useState(undefined)


    const {data, loading, error, refetch} = usefetch(`http://localhost:3001/api/hotels?min=${minprice || 0 }&max=${maxprice || 1000}`)

    // const {data, loading, error, refetch} = usefetch(`https://mystic-api.onrender.com/hotels?min=${minprice || 0 }&max=${maxprice || 1000}`)


    // &?city=${destination}

    // console.log(data)


    const handleclick = ()=>{

      refetch()

    }


  return (

    <>

        {/* the type is a prop that checks if list is there then the header is removed */}
    
        <div><Navbar/> <Header type ='list'/></div>

        <div className="listcontainer">

          <div className="listwrapper">

            <div className="listsearch">

              <h1 className="lstitle">Search</h1>

              <div className="lsitem">
                <label>Destination</label>
                <input placeholder = {destination} type = 'text'/>

              </div>


              <div className="lsitem">
                <label>Check In Date</label>
                <span onClick ={() => setopendate(!opendate)} >{` from ${format(date[0].startDate, 'MM/dd/yyyy')} to ${(format(date[0].endDate, 'MM/dd/yyy'))}`}</span>


                {opendate && <DateRange 
                    onChange={(item) =>setdate([item.selection])}
                    minDate={new Date()}
                    ranges ={date}
                 
                />}
                
              </div>

              <div className="lsitem">

                <label>Options</label>

                  <div className="isoptions">


                    <div className="lsoptionitem">

                      <span className="lsoptiontext">
                        Min price <small>per night</small>
                      </span>

                      <input type='number' onChange = {e=>setminprice(e.target.value)} className="ispotioninput" />


                    </div>


                    <div className="lsoptionitem">

                      <span className="lsoptiontext">
                        Max price <small>per night</small>
                      </span>

                      <input type='number' onChange ={e=>setmaxprice(e.target.value)}className="ispotioninput" />


                    </div>

                    <div className="lsoptionitem">

                      <span className="lsoptiontext">
                        Adult 
                      </span>

                      <input type='number'min ={1} className="ispotioninput" placeholder ={options.adult}/>


                    </div>

                    <div className="lsoptionitem">

                      <span className="lsoptiontext">
                        Children 
                      </span>

                      <input type='number' min ={0} className="ispotioninput" placeholder ={options.children}/>


                    </div>

                    <div className="lsoptionitem">

                      <span className="lsoptiontext">
                        Room 
                      </span>

                      <input type='number' min ={1} className="ispotioninput" placeholder ={options.room} />


                    </div>

                  </div>

                </div>

                <button onClick = {handleclick} >Search</button>

            </div>


            <div className="listresult">


                  
                {loading ? <h2>Loading,Please Wait...</h2> :<>
                  {data.map(items=>( 

                  
                    <Searchitem items = {items} key={items._id}/>
                    
                  ))}
                
                </>}
                
                




            </div>


          </div>





        </div>
    
    
    </>
    
  )
}

export default List