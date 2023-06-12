import {useEffect, useState} from "react";
import Axios from 'axios'

const useFetch = (url)=>{


    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(false)

    //loading will be true before fetching the data, when the data is fetched it will be loaded to the data usestate and if an error occurs the error state will be set to true.


    useEffect(()=>{

        const fetchdata = async()=>{

            setloading(true)

            try{

              const response = await Axios.get(url)  
              
              setData(response.data)

            }

            catch(err){

                seterror(err)
            }

            setloading(false)
        }

        fetchdata()

    }, [url])

    //whenever our url changes this function(fetchdata) is going to render



const refetch = async()=>{

    setloading(true)

    try{

        const response = await Axios.get(url)
        setData(response.data)

    }

    catch(err){

        seterror(err)
    }

    setloading(false)

    }


    return {data, loading, error, refetch}

}


export default useFetch