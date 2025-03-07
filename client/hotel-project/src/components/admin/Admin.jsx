import React from "react"
import { Link } from "react-router-dom"

const Admin = () => {
	return (
		<section className="admin-panel container mt-5">
			<h2 className="text-center mb-4">Welcome to the Admin Panel</h2>
			<hr className="mb-5" />

			<div className="admin-options row text-center">
				<div className="col-md-6 mb-4">
					<Link to={"/existing-rooms"} className="admin-link btn btn-hotel shadow-sm">
						Manage Rooms
					</Link>
				</div>
				<div className="col-md-6 mb-4">
					<Link to={"/existing-bookings"} className="admin-link btn btn-hotel shadow-sm">
						Manage Bookings
					</Link>
				</div>
			</div>
		</section>
	)
}

export default Admin
