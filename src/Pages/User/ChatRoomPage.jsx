import React,{Suspense} from 'react'
import Navbar from '../../Components/User/NavbarUser/NavbarUser'
import ClubUserNavbar from '../../Components/User/ClubUserNavbar/ClubUserNavbar';
import { useParams } from 'react-router-dom';
import ClubNavbar from '../../Components/User/ClubNavbar/ClubNavbar';
const LazyChatRoom = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(import('../../Components/Chat/ChatRoom'));
    }, 2000);
  });
});


function ChatRoomPage() {

  const {role}=useParams()
  console.log(role+'haaaaaaaaai')

  return (
    <>
    <Navbar/>
    <div className="pt-4  m-1 pb-4 bg-cover text-white min-h-screen bg-gray-800">
      {role==='admin'?<ClubNavbar/>:<ClubUserNavbar/>}
      {/* <ClubUserNavbar/> */}
      <Suspense fallback={<div className='flex justify-center items-center h-screen bg-gray-900 bg-opacity-60'><div className='text-white font-bold text-xl text-center'>Loading...</div></div>}>
      <LazyChatRoom />
    </Suspense>
    </div> 
    </>
  )
}

export default ChatRoomPage