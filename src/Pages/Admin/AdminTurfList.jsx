import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import AdminViewTurf from '../../Components/Admin/AdminViewTurf/AdminViewTurf'

function AdminTurfList() {
  return (
    <>
    <div className='flex bg-gray-900'>
    <AdminNavbar/>
    <AdminViewTurf/>
    </div>
    
    </>
  )
}

export default AdminTurfList