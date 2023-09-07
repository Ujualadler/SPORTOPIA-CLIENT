import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import OtpLogin from "../Components/User/Login/OtpLogin";
import HomePage from "../Pages/User/HomePage";
import SignUp from "../Components/User/SignUp/SignUp";
import Login from "../Components/User/Login/Login";
import Profile from "../Pages/User/Profile";
import GetTurfs from "../Pages/User/GetTurfs";
import VerifyMail from "../Components/User/VerifyMail/VerifyMail";
import EditProfile from "../Pages/User/EditProfile";
import TurfBookingPage from "../Pages/User/TurfBookingPage";
import PaySuccess from "../Components/User/Checkout/PaySuccess";
import BookingHistoryPage from "../Pages/User/BookingHistoryPage";
import CreateClubPage from "../Pages/User/CreateClubPage";
import ClubListPage from "../Pages/User/ClubListPage";
import ClubHomePage from "../Pages/User/ClubHomePage";
import YourClubsPage from "../Pages/User/YourClubsPage";
import CreatedClubsPage from "../Pages/User/CreatedClubsPage";
import ClubMembersPage from "../Pages/User/ClubMembersPage";
import ClubUserHomePage from "../Pages/User/ClubUserHomePage";
import ChatRoomPage from "../Pages/User/ChatRoomPage";
import ClubGalleryPage from "../Pages/User/ClubGalleryPage";
import ClubUserGalleryPage from "../Pages/User/ClubUserGalleryPage";
import CreateTournamentPage from "../Pages/User/CreateTournamentPage";
import ClubTournamentPage from "../Pages/User/ClubTournamentPage";
import ViewTournamentPage from "../Pages/User/viewTournamentPage";
import JoinedTournamentsPage from "../Pages/User/JoinedTournamentsPage";
import YourTournamentsPage from "../Pages/User/YourTournamentsPage";
import NotFound from "../Components/Error/NotFound";
import EditTournamentPage from "../Pages/User/EditTournamentPage";
import ForgotPassword from "../Components/User/Login/ForgotPassword";
import ResetPassword from "../Components/User/ResetPassword/ResetPassword";
import AddFixture from "../Components/User/ViewTournament/AddFixture";
import ViewFixture from "../Components/User/ViewTournament/ViewFixture";
import Error from "../Components/Error/Error";


function UserRoute() {
  const userToken = useSelector((store) => store.User.Token);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={userToken ? <HomePage/> : <Login />}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/resetPassword/:userId" element={<ResetPassword/>}/>
        <Route path="/otpLogin" element={userToken ? <OtpLogin /> : <OtpLogin/>}/>
        <Route path="/signup" element={userToken ? <HomePage /> : <SignUp />}/>
        <Route path="/profile" element={userToken ? <Profile /> : <Login />}/>
        <Route path="/getTurfs" element={<GetTurfs />} />
        <Route path="/verify/:user_id" element={<VerifyMail />}/>
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/booking/:id" element={userToken?<TurfBookingPage />:<Login/>}/>
        <Route path="/paymentSuccess" element={userToken?<PaySuccess />:<Login/>}/>
        <Route path="/bookingHistory" element={userToken?<BookingHistoryPage/>:<Login/>}/>
        <Route path="/createClub" element={userToken?<CreateClubPage/>:<Login/>}/>
        <Route path="/clubs" element={userToken?<ClubListPage/>:<Login/>}/>
        <Route path="/yourClubs" element={userToken?<YourClubsPage/>:<Login/>}/>
        <Route path="/clubscreated" element={userToken?<CreatedClubsPage/>:<Login/>}/>
        <Route path="/clubHome/:id" element={userToken?<ClubHomePage />:<Login/>}/>
        <Route path="/members/:id" element={userToken?<ClubMembersPage />:<Login/>}/>
        <Route path="/chat/:role" element={userToken?<ChatRoomPage/>:<Login/>}/>
        <Route path="/clubUserHome/:id" element={userToken?<ClubUserHomePage/>:<Login/>}/>
        <Route path="/clubGallery" element={userToken?<ClubGalleryPage/>:<Login/>}/>
        <Route path="/clubUserGallery" element={userToken?<ClubUserGalleryPage/>:<Login/>}/>
        <Route path="/createTournament" element={userToken?<CreateTournamentPage/>:<Login/>}/>
        <Route path="/tournaments" element={userToken?<ClubTournamentPage/>:<Login/>}/>
        <Route path="/viewTournament/:id/:role" element={userToken?<ViewTournamentPage/>:<Login/>}/>
        <Route path="/joinedTournaments" element={userToken?<JoinedTournamentsPage/>:<Login/>}/>
        <Route path="/yourTournaments/:role" element={userToken?<YourTournamentsPage/>:<Login/>}/>
        <Route path="/editTournament/:id" element={userToken?<EditTournamentPage/>:<Login/>}/>
        <Route path="/addFixture/:id" element={userToken?<AddFixture/>:<Login/>}/>
        <Route path="/viewFixture/:id" element={userToken?<ViewFixture/>:<Login/>}/>
        <Route path="/error" element={<Error/>}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default UserRoute;
