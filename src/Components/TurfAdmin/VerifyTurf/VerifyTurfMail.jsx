import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import turfAxios from "../../../Axios/turfAxios";
import { useParams } from 'react-router-dom'

function VerifyTurfMail() {
    const { user_id } = useParams();
    useEffect(()=>{
        turfAxios.post('/verifyTurf',{user_id}).then((res)=>{
            console.log(res.data.status)
            if(res.data.status===true){
                console.log("success")
            }
        }).catch((err)=>{
          navigate('/turf/error')
        })
    },[])

  return (
    <>
    <div>
    <div className='text-center font-extrabold text-2xl mt-8'>Your email is Successfully verified</div> 
    <div className='text-center font-bold text-xl mt-8 hover:text-blue-500'><Link to='/turf/login'>Click here to go to Login page</Link></div>
    </div>
    </>
  )
}

export default VerifyTurfMail