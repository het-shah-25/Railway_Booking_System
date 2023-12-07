import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/signup";
import Home from "./pages/home";
import FirstPage from "./pages/startpage";
import LandingPage from "./pages/landing";
import GetStartPage from "./pages/getstart";
import Signin from "./pages/signin";
import { getAllUsers } from "./Redux/actions/userAction";
import { useDispatch } from "react-redux";
import Verification from "./pages/Verification";
import ForgetPassword from "./pages/forgetPassword";
import ListPage from "./pages/listing";
import TrainInfo from "./pages/traininfo";
import TrainRoute from "./pages/route";
import BookingPage from "./pages/booking";
import PaymentPage from "./pages/payment";
import Myticketpage from "./pages/myticket";
import Profilepage from "./pages/myprofile";
import BookingDetail from "./pages/bookingdetails";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/getstart" element={<GetStartPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify/:token" element={<Verification />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/home" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/myticket" element={<ProtectedRoute />}>
          <Route index element={<Myticketpage />} />
        </Route>
        <Route path="/listing" element={<ProtectedRoute />}>
          <Route index element={<ListPage />} />
        </Route>
        <Route path="/traininfo" element={<ProtectedRoute />}>
          <Route index element={<TrainInfo />} />
        </Route>
        <Route path="/trainroute" element={<ProtectedRoute />}>
          <Route index element={<TrainRoute />} />
        </Route>
        <Route path="/booking" element={<ProtectedRoute />}>
          <Route index element={<BookingPage />} />
        </Route>
        <Route path="/payment" element={<ProtectedRoute />}>
          <Route index element={<PaymentPage />} />
        </Route>
        <Route path="/booking-detail" element={<ProtectedRoute />}>
          <Route index element={<BookingDetail />} />
        </Route>
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route index element={<Profilepage />} />
        </Route>
        {/* <Route path="/myticket" element={<Myticketpage />} /> */}
        {/* <Route path="/listing" element={<ListPage />} /> */}
        {/* <Route path="/traininfo" element={<TrainInfo />} /> */}
        {/* <Route path="/trainroute" element={<TrainRoute />} /> */}
        {/* <Route path="/booking" element={<BookingPage />} /> */}
        {/* <Route path="/payment" element={<PaymentPage />} /> */}
        {/* <Route path="/booking-detail" element={<BookingDetail />} /> */}
        {/* <Route path="/profile" element={<Profilepage />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

function ProtectedRoute() {
  const user = localStorage.getItem("user");

  // List of paths where no authentication is required
  const noAuthPaths = [
    "/signin",
    "/signup",
    "/forgetpassword",
    "/verify/:token",
    "/getstart",
    "/landing",
    "/",
  ];

  if (!user && !noAuthPaths.includes(window.location.pathname)) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}

export default App;
