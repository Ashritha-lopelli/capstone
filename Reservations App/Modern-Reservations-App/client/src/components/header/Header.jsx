<<<<<<< HEAD
import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBed, faPlane, faCar, faTaxi, faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns';
import { Searchcontext } from '../../context/searchcontext';
import { Authcontext } from '../../context/authcontext';
import {Link} from 'react-router-dom'




//transforms the date function into readable strings

function Header({type}) {



    const[ opendate, setopendate] = useState(false)

    const[date, setDate] = useState([{

        startDate: new Date(),
        endDate:new Date(),
        key:'selection'

    }])

    const [openoptions, setopenoptions] = useState(false)
    const [options, setoptions] = useState({

        adult:1,
        children:0,
        room:1 
    })


    const handleOption =(name, operation)=>{

        // setoptions state is initiated and the previous state is initialized which is adult:1, children:0, room:1
        setoptions(prev=>{
            return{

                ...prev,
                [name]:operation === 'i'?options[name] +1 : options[name] -1
            }
        })



        // setoptions(prev => {
        //     let newValue = prev[name];
        //     if (operation === 'i') {
        //       newValue += 1;
        //     } else {
        //       newValue -= 1;
        //     }
        //     return {
        //       ...prev,
        //       [name]: newValue
        //     };
        //   });

    }

    // navigate is used to navigate users to different pages 

    const navigate = useNavigate()

    const [destination, setdestination] = useState('')

    const {dispatch} = useContext(Searchcontext)

    const Handlesearch =()=>{

        dispatch({type:'newsearch', payload:{destination, date, options}})
        navigate('/hotels', {state: {destination, date, options }})

    }

    const {user} = useContext(Authcontext)




  return (

    <>

        <div className="header">

            {/* // if type is list then classname is headercontainer listmode, otherwise the classname is headercontainer */}

          <div className = {type ==='list'? 'headercontainer listmode': 'headercontainer'}>

            <div className="headerlist">

                <div className="headerlistitem active">

                    
                    <FontAwesomeIcon icon={faBed}/>
                    <span>Stays</span>
                </div>

                <div className="headerlistitem">

                    
                    <FontAwesomeIcon icon={faPlane}/>
                    <span>Flights</span>
                </div>

                <div className="headerlistitem">

                    
                    <FontAwesomeIcon icon={faCar}/>
                    <span>Car rentals</span>
                </div>

                <div className="headerlistitem">

                    
                    <FontAwesomeIcon icon={faBed}/>
                    <span>Attractions</span>
                </div>

                <div className="headerlistitem">

                    
                    <FontAwesomeIcon icon={faTaxi}/>
                    <span>Airport Taxi</span>
                </div>
            </div>


               { 
               type !== 'list' &&
               <>
               <h1 className="headertitle">A lifetime of discounts? It's Genius</h1>

                <p className="headerdesc">Get rewarded for your travels - unlock instant savings of 10% or more with a free Rawa account</p>

                {
                    !user &&

                    <Link to = '/register'><button className="headerbtn">Register</button></Link>
                }

                <div className="headersearch">

                    <div className="headersearchitem">

                        <FontAwesomeIcon icon ={faBed} className ='headericon'/>

                        <input type ='text' placeholder='where are you going?' className='headersearchinput' onChange ={(e)=>setdestination(e.target.value)}/>

                    </div>

                    <div className="headersearchitem">

                        <FontAwesomeIcon icon ={faCalendarDays} className ='headericon'/>

                       <span onClick = {()=>setopendate(!opendate)} className="headersearchtext">{` from ${format(date[0].startDate, 'MM/dd/yyyy')} to ${(format(date[0].endDate, 'MM/dd/yyy'))}`}</span>


                        {/* // by default the date will be hidden by the help of the useState function. */}

                      {opendate && <DateRange
                        editableDateInputs={true}
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        minDate={new Date()}
                        className ='date'
                        />}
                    </div>

                    <div className="headersearchitem">

                        <FontAwesomeIcon icon ={faBed} className ='headericon'/>

                       <span className="headersearchtext" onClick ={()=>setopenoptions(!openoptions)}>{`${options.adult} adult ${options.children} children ${options.room} room` }</span>


                       {openoptions && <div className="options">

                        <div className="optionitem">
                            <span className="optiontext">Adult</span>

                            <div className="optioncounter">
                                <button className="optioncounterbtn" 
                                disabled={options.adult <=1}
                                onClick={()=>handleOption('adult', 'd')} >-</button>
                                <span className="optioncounternum">{options.adult}</span>
                                <button className="optioncounterbtn" onClick ={()=>handleOption('adult', 'i')}>+</button>
                            </div>

                        </div>


                        <div className="optionitem">
                            <span className="optiontext">Children</span>

                            <div className="optioncounter">

                                <button className="optioncounterbtn" 
                                disabled={options.children <1}

                                onClick={()=>handleOption('children', 'd')} >-</button>

                                <span className="optioncounternum">{options.children}</span>
                                <button className="optioncounterbtn" onClick ={()=>handleOption('children', 'i')}>+</button>

                            </div>
                        </div>

                        
                        <div className="optionitem">
                            <span className="optiontext">Room</span>

                            <div className="optioncounter">
                            
                                <button className="optioncounterbtn" 
                                disabled ={options.room <=1}
                                onClick={()=>handleOption('room', 'd')}>-</button>
                                <span className="optioncounternum">{options.room}</span>
                                <button className="optioncounterbtn" onClick={()=>handleOption('room', 'i')}>+</button>
                            </div>

                        </div>





                       </div>
                    }
                    </div>


                    <div className="headersearchitem">

                       <button className="headerbtn" onClick ={Handlesearch} >Search</button>

                    </div>





                </div>

             </>
            }
          </div>
        </div>
            

    </>


  )
}

=======
import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBed, faPlane, faCar, faTaxi, faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns';
import { Searchcontext } from '../../context/searchcontext';
import { Authcontext } from '../../context/authcontext';
import {Link} from 'react-router-dom'




//transforms the date function into readable strings

function Header({type}) {



    const[ opendate, setopendate] = useState(false)

    const[date, setDate] = useState([{

        startDate: new Date(),
        endDate:new Date(),
        key:'selection'

    }])

    const [openoptions, setopenoptions] = useState(false)
    const [options, setoptions] = useState({

        adult:1,
        children:0,
        room:1 
    })


    const handleOption =(name, operation)=>{

        // setoptions state is initiated and the previous state is initialized which is adult:1, children:0, room:1
        setoptions(prev=>{
            return{

                ...prev,
                [name]:operation === 'i'?options[name] +1 : options[name] -1
            }
        })



        // setoptions(prev => {
        //     let newValue = prev[name];
        //     if (operation === 'i') {
        //       newValue += 1;
        //     } else {
        //       newValue -= 1;
        //     }
        //     return {
        //       ...prev,
        //       [name]: newValue
        //     };
        //   });

    }

    // navigate is used to navigate users to different pages 

    const navigate = useNavigate()

    const [destination, setdestination] = useState('')

    const {dispatch} = useContext(Searchcontext)

    const Handlesearch =()=>{

        dispatch({type:'newsearch', payload:{destination, date, options}})
        navigate('/hotels', {state: {destination, date, options }})

    }

    const {user} = useContext(Authcontext)




  return (

    <>

        <div className="header">

            {/* // if type is list then classname is headercontainer listmode, otherwise the classname is headercontainer */}

          <div className = {type ==='list'? 'headercontainer listmode': 'headercontainer'}>

            <div className="headerlist">

                <div className="headerlistitem active">

                    
                    <FontAwesomeIcon icon={faBed}/>
                    <span>Stays</span>
                </div>

                <div className="headerlistitem">

                    
                    <FontAwesomeIcon icon={faPlane}/>
                    <span>Flights</span>
                </div>

                <div className="headerlistitem">

                    
                    <FontAwesomeIcon icon={faCar}/>
                    <span>Car rentals</span>
                </div>

                <div className="headerlistitem">

                    
                    <FontAwesomeIcon icon={faBed}/>
                    <span>Attractions</span>
                </div>

                <div className="headerlistitem">

                    
                    <FontAwesomeIcon icon={faTaxi}/>
                    <span>Airport Taxi</span>
                </div>
            </div>


               { 
               type !== 'list' &&
               <>
               <h1 className="headertitle">A lifetime of discounts? It's Genius</h1>

                <p className="headerdesc">Get rewarded for your travels - unlock instant savings of 10% or more with a free Mystic Travels account</p>

                {
                    !user &&

                    <Link to = '/register'><button className="headerbtn">Register</button></Link>
                }

                <div className="headersearch">

                    <div className="headersearchitem">

                        <FontAwesomeIcon icon ={faBed} className ='headericon'/>

                        <input type ='text' placeholder='where are you going?' className='headersearchinput' onChange ={(e)=>setdestination(e.target.value)}/>

                    </div>

                    <div className="headersearchitem">

                        <FontAwesomeIcon icon ={faCalendarDays} className ='headericon'/>

                       <span onClick = {()=>setopendate(!opendate)} className="headersearchtext">{` from ${format(date[0].startDate, 'MM/dd/yyyy')} to ${(format(date[0].endDate, 'MM/dd/yyy'))}`}</span>


                        {/* // by default the date will be hidden by the help of the useState function. */}

                      {opendate && <DateRange
                        editableDateInputs={true}
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        minDate={new Date()}
                        className ='date'
                        />}
                    </div>

                    <div className="headersearchitem">

                        <FontAwesomeIcon icon ={faBed} className ='headericon'/>

                       <span className="headersearchtext" onClick ={()=>setopenoptions(!openoptions)}>{`${options.adult} adult ${options.children} children ${options.room} room` }</span>


                       {openoptions && <div className="options">

                        <div className="optionitem">
                            <span className="optiontext">Adult</span>

                            <div className="optioncounter">
                                <button className="optioncounterbtn" 
                                disabled={options.adult <=1}
                                onClick={()=>handleOption('adult', 'd')} >-</button>
                                <span className="optioncounternum">{options.adult}</span>
                                <button className="optioncounterbtn" onClick ={()=>handleOption('adult', 'i')}>+</button>
                            </div>

                        </div>


                        <div className="optionitem">
                            <span className="optiontext">Children</span>

                            <div className="optioncounter">

                                <button className="optioncounterbtn" 
                                disabled={options.children <1}

                                onClick={()=>handleOption('children', 'd')} >-</button>

                                <span className="optioncounternum">{options.children}</span>
                                <button className="optioncounterbtn" onClick ={()=>handleOption('children', 'i')}>+</button>

                            </div>
                        </div>

                        
                        <div className="optionitem">
                            <span className="optiontext">Room</span>

                            <div className="optioncounter">
                            
                                <button className="optioncounterbtn" 
                                disabled ={options.room <=1}
                                onClick={()=>handleOption('room', 'd')}>-</button>
                                <span className="optioncounternum">{options.room}</span>
                                <button className="optioncounterbtn" onClick={()=>handleOption('room', 'i')}>+</button>
                            </div>

                        </div>





                       </div>
                    }
                    </div>


                    <div className="headersearchitem">

                       <button className="headerbtn" onClick ={Handlesearch} >Search</button>

                    </div>





                </div>

             </>
            }
          </div>
        </div>
            

    </>


  )
}

>>>>>>> a11b54c4ee3b9de9d6744885d7c2c200b3ea9436
export default Header