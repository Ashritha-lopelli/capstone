// import React, {useContext, useState} from 'react'
// import './reg.css'
// import {RegContext} from '../../context/regcontext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'



// function Reg() {


//     const [details, setdetails] = useState({

//         username:undefined,
//         email:undefined,
//         password:undefined,
//         admin:undefined

//     })

//     const {users, load, errors, dispatch} = useContext(RegContext)

//     // console.log(users)
//     // console.log(load)

//     // console.log(errors)


//     const navigate = useNavigate()


//     const handleChange = (e)=>{


//         setdetails((prev)=>({...prev, [e.target.id]:e.target.value}))


//     }


//     const [successmsg, setsuccessmsg] = useState('')

//     const [errmsg, seterrmsg] = useState('')


//     const submit = async(e)=>{

//         e.preventDefault()

//         dispatch({type:'regstart'})

//         try{

//             const register = await axios.post('http://localhost:3001/api/auth/register', details)

//             dispatch({type:'regcomplete', payload:register.data})

//             setTimeout(()=>{

//                 setsuccessmsg(register.data.msg)
    
    
//                 navigate('/')

//             }, 2000)


//             console.log(register)

//         }

//         catch(err){

//             dispatch({type:'regfail', payload:err.register.data})

//             setTimeout(()=>{

//                 seterrmsg(err.register.data.msg)

//             },2000)
//         }


//     }

//   return (


//     <>
    
    

//         <div className="mainreg">



//             <div className="inner-reg">

//             <p className='reg-p'>Register to Mystic Travels</p>

//                 <div className="inner">
//                     <label className='lbls'>Username:</label>
//                     <input type="text" placeholder = 'username' id = 'username' className="reg" required onChange={handleChange} />
//                 </div>


//                 <div className="inner">
//                     <label className='lbls'>Email:</label>
//                     <input type="email" placeholder = 'email' onChange={handleChange} id = 'email' required className="reg" />
//                 </div>

//                 <div className="inner">
//                     <label className='lbls'>Password:</label>
//                     <input type="password" onChange={handleChange}placeholder = 'password' id = 'password' required className="reg" />
//                 </div>


//                 <div className="inner">
//                     <label className='lbls'>Admin:</label>
//                     <input type="checkbox" id = 'admin' className="reg" />
//                 </div>


                
//                 <button className="btn" disabled = {load} onClick ={submit}>Register</button>

//                 {successmsg && <span className='success'>{successmsg}</span>}

//                 {errmsg && <span className='error'>{errmsg}</span>}




//             </div>



//         </div>
    



    
//     </>


    
//   )
// }

// export default Reg


















            // OTHER CODE


















import React, { useContext, useState } from 'react';
import './reg.css';
 import { RegContext } from '../../context/regcontext';
 import { useNavigate } from 'react-router-dom';
 import axios from 'axios';
import swal from 'sweetalert';
            
 function Reg() {


  const [details, setdetails] = useState({


                username: " ",
                email: " ",
                password: " ",
                admin: undefined

              });
            
              const { users, load, errors, dispatch } = useContext(RegContext);
              const navigate = useNavigate();
            
              const handleChange = (e) => {
                setdetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
              };
            
              const [successmsg, setsuccessmsg] = useState('');
              const [errmsg, seterrmsg] = useState('');
            
              const submit = async (e) => {
                e.preventDefault();
                dispatch({ type: 'regstart' });
            
                try {
                  const register = await axios.post(
                    'http://localhost:3001/api/auth/register',
                    details
                  );
            
                  dispatch({ type: 'regcomplete', payload: register.data });
            
                  swal({
                    title: 'Registration Successful',
                    text: register.data.msg,
                    icon: 'success',
                    button: 'Go to Home'
                  }).then(() => {
                    navigate('/');
                  });
            
                  console.log(register);

                } catch (err) {
                  dispatch({ type: 'regfail', payload: err.register.data });
            
                  setTimeout(() => {
                    seterrmsg(err.register.data.msg);
                  }, 2000);
                }
              };
            
              return (
                <>


                  <div className="mainreg">
                    <div className="inner-reg">
                      <p className="reg-p">Register to Mystic Travels</p>
            
                      <form onSubmit={submit}>
                        <div className="inner">
                          <label className="lbls">Username:</label>
                          <input
                            type="text"
                            placeholder="username"
                            id="username"
                            className="reg"
                            required
                            onChange={handleChange}
                          />
                        </div>
            
                        <div className="inner">
                          <label className="lbls">Email:</label>
                          <input
                            type="email"
                            placeholder="email"
                            onChange={handleChange}
                            id="email"
                            required
                            className="reg"
                          />
                        </div>
            
                        <div className="inner">
                          <label className="lbls">Password:</label>
                          <input
                            type="password"
                            onChange={handleChange}
                            placeholder="password"
                            id="password"
                            required
                            className="reg"
                          />
                        </div>
            
                        <div className="inner">
                          <label className="lbls">Admin:</label>
                          <input type="checkbox" id="admin" className="reg" />
                        </div>
            
                        <button className="btn" disabled={load} type="submit">
                          Register
                        </button>
                      </form>
            
                      {successmsg && <span className="success">{successmsg}</span>}
                      {errmsg && <span className="error">{errmsg}</span>}
                    </div>
                  </div>

                  
                </>
              );
            }
            
            export default Reg;
            
