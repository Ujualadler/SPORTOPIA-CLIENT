import React from 'react'
import ViewTournament from '../../Components/User/ViewTournament/ViewTournament'
import Navbar from '../../Components/User/NavbarUser/NavbarUser'
import ClubNavbar from '../../Components/User/ClubNavbar/ClubNavbar'
import { useParams } from 'react-router-dom'
import ClubUserNavbar from '../../Components/User/ClubUserNavbar/ClubUserNavbar'


function ViewTournamentPage() {
  const{role}=useParams()
  return (
    <>
    <Navbar/>
    <div className="pt-4 m-1 pb-4 bg-cover  bg-center bg-gray-800">
    {role === "member"?<ClubUserNavbar/>:<ClubNavbar/>}
    <ViewTournament/>
    </div>
    </>
  )
}

export default ViewTournamentPage