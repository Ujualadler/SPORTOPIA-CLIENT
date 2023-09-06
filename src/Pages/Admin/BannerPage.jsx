import React from 'react'
import AdminNavbar from '../../Components/Admin/AdminNavbar/AdminNavbar'
import Banner from '../../Components/Admin/Banner/Banner'

function BannerPage() {
  return (
    <>
    <div className="flex bg-gray-900">
      <AdminNavbar/>
      <Banner/>
    </div>
  </>
  )
}

export default BannerPage