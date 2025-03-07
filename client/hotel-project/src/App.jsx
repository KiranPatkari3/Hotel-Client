import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import ExistingRooms from "./components/room/ExistingRooms";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import EditRoom from "./components/room/EditRoom";
import AddRoom from "./components/room/AddRoom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import Checkout from "./components/bookings/Checkout";
import BookingSuccess from "./components/bookings/BookingsSuccess";
import Bookings from "./components/bookings/Bookings";
import FindBooking from "./components/bookings/FindBooking";
import Login from "./components/auth/login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import { AuthProvider } from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import BookingForm from "./components/bookings/BookingForm";

function App() {
	return (
		<AuthProvider>
			<main>
				<Router>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/edit-room/:roomId" element={<EditRoom />} />
						<Route path="/existing-rooms" element={<ExistingRooms />} />
						<Route path="/add-room" element={<AddRoom />} />
						<Route path="/browse-all-rooms" element={<RoomListing />} />
						<Route path="/admin" element={<Admin />} />
						
						{/* Protected route */}
						<Route
							path="/book-room/:roomId"
							element={
								<RequireAuth>
									<Checkout />
								</RequireAuth>
							}
						/>

						{/* Public route */}
						<Route path="/reserve-room/:roomId" element={<BookingForm />} />

						<Route path="/booking-success" element={<BookingSuccess />} />
						<Route path="/existing-bookings" element={<Bookings />} />
						<Route path="/find-booking" element={<FindBooking />} />

						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Registration />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/logout" element={<FindBooking />} />
					</Routes>
				</Router>
				<Footer />
			</main>
		</AuthProvider>
	)
}

export default App;
