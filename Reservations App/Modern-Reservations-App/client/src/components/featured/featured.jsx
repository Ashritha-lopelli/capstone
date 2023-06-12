<<<<<<< HEAD
import React from 'react';
import usefetch from '../../hooks/usefetch'
import './featured.css'


function Featured(){

    // const {data, loading, error} = usefetch('hotels/countbycity?cities=Berlin,Madrid,London')


    const {data, loading, error} = usefetch('http://localhost:3001/api/hotels/countbycity?cities=Berlin,Madrid,London')

    // const {data, loading, error} = usefetch('https://mystic-api.onrender.com/hotels/countbycity?cities=Berlin,Madrid,London')


        // console.log(data)


        // "proxy":"http://localhost:3001/api/

     return(


        <>
        

        {loading ? <h2>Loading,Please wait...</h2> : <> <div className="featured">
                
                

                    <div className="featureditem">
                        <img src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" alt="Dublin" className="featuredimg" />


                        <div className="featuredtitles">

                            <h1>Berlin</h1>
                            <h2>{data[0]}</h2>

                        </div>
                    </div>

                    <div className="featureditem">

                        <img src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=" alt="" className="featuredimg" />



                        <div className="featuredtitles">
                            <h1>Madrid</h1>
                            <h2>{data[1]}</h2>
                        </div>

                    </div>


                    <div className="featureditem">

                        <img src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=" alt="" className="featuredimg" />

                        <div className="featuredtitles">

                            <h1>London</h1>
                            <h2>{data[2]}</h2>
                            
                        </div>

                    </div>


                


            </div> </>}
            
        
        
        </>


    
    )
}


=======
import React from 'react';
import usefetch from '../../hooks/usefetch'
import './featured.css'


function Featured(){

    // const {data, loading, error} = usefetch('hotels/countbycity?cities=Berlin,Madrid,London')


    const {data, loading, error} = usefetch('http://localhost:3001/api/hotels/countbycity?cities=Berlin,Madrid,London')

    // const {data, loading, error} = usefetch('https://mystic-api.onrender.com/hotels/countbycity?cities=Berlin,Madrid,London')


        // console.log(data)


        // "proxy":"http://localhost:3001/api/

     return(


        <>
        

        {loading ? <h2>Loading,Please wait...</h2> : <> <div className="featured">
                
                

                    <div className="featureditem">

                        <img src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=" alt="Dublin" className="featuredimg" />


                        <div className="featuredtitles">

                            <h1>Tour Natural Green Forests</h1>
                            <h2>{data[0]}</h2>

                        </div>
                    </div>

                    <div className="featureditem">

                        <img src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=" alt="" className="featuredimg" />



                        <div className="featuredtitles">
                            <h1>Tour Cities</h1>
                            <h2>{data[1]}</h2>
                        </div>

                    </div>


                    <div className="featureditem">

                        <img src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=" alt="" className="featuredimg" />

                        <div className="featuredtitles">

                            <h1>Tour & Hike Mountains</h1>
                            <h2>{data[2]}</h2>
                            
                        </div>

                    </div>


                


            </div> </>}
            
        
        
        </>


    
    )
}


>>>>>>> a11b54c4ee3b9de9d6744885d7c2c200b3ea9436
export default Featured