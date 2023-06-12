import React, {useContext, useState} from 'react'
import { Authcontext } from '../../context/authcontext'
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Login() {


    const [credentials, setcredentials] = useState({

        username:undefined,
        password:undefined
    })


    const {user, loading, error, dispatch} = useContext(Authcontext)

    // when user clicks the login button he is going to be redirected to the home page

    const navigate = useNavigate()


    const handlechange = (e)=>{

        setcredentials((prev)=>({...prev, [e.target.id]:e.target.value}))

        // we are taking the previous value and returning it together with credetential name using the id 

    }


    const handleclick = async(e)=>{

        //function is async because we are going to be making API requests

        e.preventDefault() // prevents page from erasing its contents

        dispatch({type:'loginStart'})

        try{

            const res = await axios.post('http://localhost:3001/api/auth/login', credentials)

            // const res = await axios.post('https://mystic-api.onrender.com/auth/login', credentials)


            dispatch({type:'loginsuccess', payload:res.data})

            navigate('/')

            // console.log(res)
        }

        catch(err){

            dispatch({type:'loginfailure', payload:err.response.data})
        }


    }


    // console.log(user)




  return (


    <>


        <div className="login">


            <div className="lcont">

                <input type="text" placeholder='username' onChange ={handlechange} id="username" className='input'/>

                <input type="password" placeholder='password' onChange ={handlechange} id="password" className='input'/>

                <button disabled = {loading} onClick = {handleclick} className="btn">Login</button>

                {/* button will be disabled if it is loading */}

                {error && <span className='error'>{error.message}</span>}




            </div>

         {/* login */}



        </div>





    </>
    


  )
}

export default Login