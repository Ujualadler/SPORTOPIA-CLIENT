import React, { useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import UserAxios from '../../../Axios/userAxios';
import { toast } from 'react-toastify';

function ResetPassword() {

    const { userId } = useParams()
    const userAxios=UserAxios()

    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState('')
    const navigate = useNavigate()

    const resetPassword = () => {
        if(password.length<4){
            setErr('Password must contain atleast 4 digits')
        }
        if (password.trim().length == 0 || rePassword.trim().length == 0) {
            setErr('Fill all the fields')
        } else if (password == rePassword) {
            userAxios.post('/resetPassword', { password, userId }).then((res) => {
                toast.success(res?.data?.message)
                setSuccess(true)
            }).catch((err) => {
               console.log(err)
               navigate('/error')
            })
        } else {
            setErr('Password not match')
        }
    }
    return (
        <div className='bg-black'>
                    <main id="content" role="main" className="w-full flex h-screen items-center max-w-md mx-auto p-6">
            <div className="mt-7 w-full bg-white rounded-xl shadow-lg dark:bg-gray-900 bg-opacity-60 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Enter new password</h1>
                    </div>

                    <div className="mt-5">
                        <div>
                            <div className="grid gap-y-4">
                                <div>
                                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Enter Password</label>
                                    <div className="relative">
                                        <input
                                            type='password'
                                            placeholder='password'
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">RePassword</label>
                                    <div className="relative">
                                        <input
                                            type='password'
                                            placeholder='repassword'
                                            onChange={(e) => setRePassword(e.target.value)}
                                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-center text-red-600 mt-2">{err || '[password should contain atleast 4 digits ]'}</p>
                                </div>
                                {success ? <button
                                    onClick={() => navigate('/login')}
                                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-black text-white hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                >
                                    Go to login
                                </button> : <button
                                    onClick={resetPassword}
                                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-black text-white hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                >
                                    Reset password
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </div>

    )
}

export default ResetPassword