import React, {useContext} from 'react'
import './navbar.css'
import {Link} from 'react-router-dom';
import { Authcontext } from '../../context/authcontext';
import { RegContext } from '../../context/regcontext';

function Navbar() {


  const {user} = useContext(Authcontext)

  const {users} = useContext(RegContext)


  const getUsername = ()=>{

    if (user) {
      return user.username;

    } else if (users) {

      return users.username;

    } else {

      return 'User';

    }

  }

  return (

    <>
          
          <div className="navbar">

          
                <div className="navcontainer">
                  <Link to ='/' style={{color:'inherit', textDecoration:'none'}}>
                    <span className="logo">Mystic Travels</span> 
                  </Link>   

                    {user || users ? <span>Welcome, <b>{getUsername()}</b></span> :

                      <div className="navitems">


                          <Link to ='/register'><button className="navbutton">Register</button></Link>

                          <Link to ='/login'><button className="navbutton">LogIn</button></Link>


                      </div>
                   }
                    
                </div>    
           

        </div>
        
        



            


    </>


  )
}

export default Navbar