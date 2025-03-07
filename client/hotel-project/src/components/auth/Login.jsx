import React, { useState } from "react"
import { loginUser } from "../utils/ApiFunction"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import "./Login.css" // Import the CSS file for additional styles

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const success = await loginUser(login)
		if (success) {
			const token = success.token
			auth.handleLogin(token)
			navigate(redirectUrl, { replace: true })
		} else {
			setErrorMessage("Invalid username or password. Please try again.")
		}
		setTimeout(() => {
			setErrorMessage("")
		}, 4000)
	}

	return (
		<section className="login-page">
			<div className="login-container">
				{errorMessage && <p className="alert alert-danger text-center">{errorMessage}</p>}
				<h2 className="text-center mb-4">Login</h2>
				<form onSubmit={handleSubmit} className="login-form">
					<div className="form-group mb-4">
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							placeholder="Enter your email"
							value={login.email}
							onChange={handleInputChange}
						/>
					</div>

					<div className="form-group mb-4">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							className="form-control"
							placeholder="Enter your password"
							value={login.password}
							onChange={handleInputChange}
						/>
					</div>

					<div className="d-flex justify-content-between align-items-center">
						<button type="submit" className="btn btn-hotel btn-login">
							Login
						</button>
						<span>
							Don't have an account? <Link to="/register" className="text-link">Register</Link>
						</span>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Login
