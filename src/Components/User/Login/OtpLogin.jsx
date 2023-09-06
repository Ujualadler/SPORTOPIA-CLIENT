import React, { useEffect, useRef, useState } from 'react'
import OtpInput from 'otp-input-react'
import { CgSpinner } from 'react-icons/cg'
import { BsFillShieldLockFill } from 'react-icons/bs'
import UserAxios from '../../../Axios/userAxios'
import { toast } from 'react-toastify';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../../Firebase/firebase.config';
import { useDispatch } from 'react-redux'
import { UserLogin } from "../../../Redux/Slices/userAuth";
import { useNavigate } from 'react-router-dom'


function OtpLogin() {

  const userAxios=UserAxios()

  const regex_mobile = /^\d{10}$/
  const [clicked, setClicked] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState()
  const [resend, setResend] = useState(false)
  const [data, setData] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const checkMob = () => {
    setResend(false)
    if ((regex_mobile.test(phone) == false)) {  
      toast.error('Enter valid mobile number')
    } else {
      userAxios.post('/otpLogin', { phone }).then((res) => {
        console.log(phone)
        if (res.status == 200) {
          setData(res.data.data)
          onCaptchaVerify()
          const appVerifier = window.recaptchaVerifier
          const phoneNo = '+91' + phone
          signInWithPhoneNumber(auth, phoneNo, appVerifier)
            .then((confirmationResult) => {
              console.log('asdfsdfsdfsdf');
              window.confirmationResult = confirmationResult;
              setShowOTP(true)
              toast.success('OTP send')
            }).catch((error) => {
              console.log(error);
              if (error?.response?.data?.errMsg) {
                toast.error(error?.response?.data?.errMsg)
              }
            });
        }else{
                toast.error(error?.response?.data?.errMsg)
                toast.error('INVALID MOBILE')
        }
      }).catch((err)=>{
        toast.error('register first')
      })
    }
  }

  function onCaptchaVerify() {

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          checkMob()
        },
        'expired-callback': () => {
          console.log('expired callback');
        }
      }, auth);
    }

  }

  function otpVerify() {
    setClicked(true)
    window.confirmationResult.confirm(otp).then(async (res) => {
      dispatch(UserLogin({token: data.token}))
      navigate('/')
    }).catch((err) => {
      setResend(true)
      setClicked(false)
      toast.error('Otp verify error')
    })
  }


  const [seconds, setSeconds] = useState(60);
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    if(showOTP){
      setSeconds(60)
      if (seconds > 0) {
        const decrementSeconds = () => {
          setSeconds(prevSeconds => prevSeconds - 1);
        }
        countdownIntervalRef.current = setInterval(decrementSeconds, 1000);
      }
  
      return () => clearInterval(countdownIntervalRef.current);
    }
  }, [resend,showOTP]);

  useEffect(() => {
    if (seconds <= 0) {
      setResend(true)
      clearInterval(countdownIntervalRef.current)
    }
  }, [seconds]);

  return (
    <div style={{ 'height': '100vh' }} className='bg-black flex justify-center items-center'>
      <div id='recaptcha-container'></div>
      <div className=' bg-black border border-white p-5 rounded'>
        <div className='bg-white text-emarald-500 w-fit mx-auto p-4 rounded-full'>
          <BsFillShieldLockFill size={30} />
        </div>
        {showOTP ? <h1 className='text-white font-bold text-center mt-2'>Enter Your OTP</h1> : <h1 className='text-white font-bold text-center mt-2'>Enter Your Mobile</h1>}
        <div className='p-5'>
          {showOTP ? <OtpInput
            className='ms-3'
            OTPLength={6}
            value={otp}
            onChange={setOtp}
            otpType='number'
            disabled={false}
            autoFocus
          /> : <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="phone"
            placeholder="phone No" />}
         {showOTP&&<div className='flex justify-center'>
            <span className='text-center text-white'>{seconds}</span>
          </div>}
          {!showOTP ? <button className='text-white mt-3 bg-gray-600 w-full flex gap-1 items-center justify-center py-2.5 rounded' onClick={checkMob}><span>Send Otp</span></button> : resend ? <button className='text-white mt-3 bg-gray-600 w-full flex gap-1 items-center justify-center py-2.5 rounded' onClick={checkMob}>{clicked ? <CgSpinner size={20} className='animate-spin' /> : ''}<span>Resend Otp</span></button> : <button className='text-white mt-3 bg-gray-800 w-full flex gap-1 items-center justify-center py-2.5 rounded' onClick={otpVerify}>{clicked ? <CgSpinner size={20} className='animate-spin' /> : ''}<span>Verify OTP</span></button>}
        </div>

      </div>
    </div>
  )
}

export default OtpLogin