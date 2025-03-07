import React, { useEffect, useState } from "react"
import { deleteUser, getBookingsByUserId, getUser } from "../utils/ApiFunction"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import './Profile.css' // Ensure you import the CSS file

const Profile = () => {
	const [user, setUser] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [{ id: "", name: "" }]
	})

	const [bookings, setBookings] = useState([])
	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				setUser(userData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchUser()
	}, [userId])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getBookingsByUserId(userId, token)
				setBookings(response)
			} catch (error) {
				console.error("Error fetching bookings:", error.message)
				setErrorMessage(error.message)
			}
		}

		fetchBookings()
	}, [userId])

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete your account? This action cannot be undone."
		)
		if (confirmed) {
			await deleteUser(userId)
				.then((response) => {
					setMessage(response.data)
					localStorage.removeItem("token")
					localStorage.removeItem("userId")
					localStorage.removeItem("userRole")
					navigate("/")
					window.location.reload()
				})
				.catch((error) => {
					setErrorMessage(error.data)
				})
		}
	}

	return (
		<div className="profile-container">
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			{message && <p className="alert alert-success">{message}</p>}
			{user ? (
				<div className="profile-card">
					<div className="profile-header">
						<img
							src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
							alt="Profile"
							className="profile-image"
						/>
						<div className="profile-info">
							<h2>{user.firstName} {user.lastName}</h2>
							<p><strong>ID:</strong> {user.id}</p>
							<p><strong>Email:</strong> {user.email}</p>
							<p><strong>Roles:</strong> {user.roles.map(role => role.name).join(", ")}</p>
						</div>
					</div>

					<div className="booking-history">
						<h3>Booking History</h3>
						{bookings.length > 0 ? (
							<table className="table table-striped table-bordered">
								<thead>
									<tr>
										<th>Booking ID</th>
										<th>Room ID</th>
										<th>Room Type</th>
										<th>Check In Date</th>
										<th>Check Out Date</th>
										<th>Confirmation Code</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{bookings.map((booking) => (
										<tr key={booking.id}>
											<td>{booking.id}</td>
											<td>{booking.room.id}</td>
											<td>{booking.room.roomType}</td>
											<td>{moment(booking.checkInDate).format("MMM Do, YYYY")}</td>
											<td>{moment(booking.checkOutDate).format("MMM Do, YYYY")}</td>
											<td>{booking.bookingConfirmationCode}</td>
											<td className="text-success">Ongoing</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>You have not made any bookings yet.</p>
						)}
					</div>

					<div className="delete-account">
						<button className="btn btn-danger" onClick={handleDeleteAccount}>
							Close Account
						</button>
					</div>
				</div>
			) : (
				<p>Loading user data...</p>
			)}
		</div>
	)
}

export default Profile
