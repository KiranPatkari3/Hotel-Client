import React, { useState } from "react"
import { registerUser } from "../utils/ApiFunction"
import { Link } from "react-router-dom"
import './Registration.css' // Ensure you import the CSS file

const Registration = () => {
	const [registration, setRegistration] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	const handleInputChange = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
	}

	const handleRegistration = async (e) => {
		e.preventDefault()
		try {
			const result = await registerUser(registration)
			setSuccessMessage(result)
			setErrorMessage("")
			setRegistration({ firstName: "", lastName: "", email: "", password: "" })
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error: ${error.message}`)
		}
		setTimeout(() => {
			setErrorMessage("")
			setSuccessMessage("")
		}, 5000)
	}

	return (
		<section className="registration-page">
			<div className="registration-container">
				{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
				{successMessage && <p className="alert alert-success">{successMessage}</p>}

				<h2>Register</h2>
				<form onSubmit={handleRegistration} className="registration-form">
					<div className="row mb-3">
						<div className="col-sm-6">
							<label htmlFor="firstName" className="form-label">
								First Name
							</label>
							<input
								id="firstName"
								name="firstName"
								type="text"
								className="form-control"
								value={registration.firstName}
								onChange={handleInputChange}
							/>
						</div>
						<div className="col-sm-6">
							<label htmlFor="lastName" className="form-label">
								Last Name
							</label>
							<input
								id="lastName"
								name="lastName"
								type="text"
								className="form-control"
								value={registration.lastName}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={registration.email}
							onChange={handleInputChange}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							className="form-control"
							value={registration.password}
							onChange={handleInputChange}
						/>
					</div>

					<div className="mb-3">
						<button type="submit" className="btn btn-register">
							Register
						</button>
					</div>

					<div className="message-container">
						<span>
							Already have an account? <Link to={"/login"} className="text-link">Login</Link>
						</span>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Registration
