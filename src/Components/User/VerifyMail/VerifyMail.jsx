import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import userAxios from "../../../Axios/userAxios";
import { useParams } from 'react-router-dom'

function VerifyMail() {
    const { user_id } = useParams();
    useEffect(()=>{
        userAxios.post('/verify',{user_id}).then((res)=>{
            console.log(res.data.status)
            if(res.data.status===true){
                console.log("success")
            }
        }).catch((err)=>{
          navigate('/error')
        })
    },[])

  return (
    <>
    <div>
    <div className='text-center font-extrabold text-2xl mt-8'>Your email is Successfully verified</div> 
    <div className='text-center font-bold text-xl mt-8 hover:text-blue-500'><Link to='/login'>Click here to go to Login page</Link></div>
    </div>
    </>
  )
}

export default VerifyMail