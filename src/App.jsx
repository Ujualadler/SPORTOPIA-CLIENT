import "./index.css";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./Components/Error/NotFound";
import UserRoute from "./Routes/UserRoute";
import TurfRoute from "./Routes/TurfRoute";
import AdminRoute from "./Routes/AdminRoute";


function App() {

  return (
    <>
     <ToastContainer/>
      <BrowserRouter>
        <Routes>
       
          

          {/* USER ROUTES */}

          <Route path="/*" element={<UserRoute/>}/>
         

          {/* TURF ADMIN ROUTES */}

          <Route path="/turf/*" element={<TurfRoute/>}/>
         

          {/* ADMIN ROUTES */}

          <Route path="/admin/*" element={<AdminRoute/>}/>
       

          {/* NOT FOUND */}

          <Route path='*' element={<NotFound/>}/>


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
