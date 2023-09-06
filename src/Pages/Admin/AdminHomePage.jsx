import React from 'react'
import AdminHome from '../../Components/Admin/AdminHome/AdminHome'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'

function AdminHomePage() {
  return (
    <>
    <div className='flex h-screen overflow-hidden'> 
    <AdminNavbar/>
    <AdminHome/>
    </div>
   
    </>
  )
}

export default AdminHomePage