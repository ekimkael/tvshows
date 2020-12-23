import { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../utils/validationSchemas"
import AuthTemplate from "../templates/auth.template"
import Router from "next/router"

function Login() {
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState("")
	const [user, setUser] = useState({})
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(loginSchema),
	})

	const onSubmit = (user) => {
		setLoading(true)
		fetch("api/login", {
			method: "post",
			body: JSON.stringify({
				identifier: user.email,
				password: user.password,
			}),
		})
			.then((response) => response.json())
			.then((datas) => {
				setLoading(false)
				if (datas.status === 200) {
					setUser(datas.user.username)
					// Router.push(`/${datas.user.firstname}`)
					Router.push(`/shows`)
				} else {
					setMessage(datas.message.body)
				}
			})
	}

	return (
		<>
			<Head>
				<title>Login to your account | TVSHOWS</title>
			</Head>
			{/*  */}
			<div className="container">
				<Link href="/">
					<a className="text-dark">
						<h1 className="text-center">
							<b>TVSHOWS</b>
						</h1>
					</a>
				</Link>
				<h3 className="text-center text-primary">Signin</h3>
				<div className="row">
					<form className="col-md-5 mx-auto" onSubmit={handleSubmit(onSubmit)}>
						{message !== "" ? (
							<div className="alert alert-danger" role="alert">
								{message}
							</div>
						) : (
							""
						)}
						<div className="form-group">
							<input
								type="email"
								className={`form-control ${errors.email && `is-invalid`}`}
								name="email"
								placeholder="Your email adress"
								autoComplete="off"
								ref={register}
							/>
							{errors.email && (
								<small id="email" className="form-text text-danger">
									{errors.email.message}
								</small>
							)}
						</div>
						<div className="form-group">
							<input
								type="password"
								name="password"
								className={`form-control ${errors.password && `is-invalid`}`}
								placeholder="Your password"
								ref={register}
							/>
							{errors.password && (
								<small id="password" className="form-text text-danger">
									{errors.password.message}
								</small>
							)}
							<Link href="/forgot-password">
								<a>
									<small className="form-text text-muted text-right">
										Forgot your password?
									</small>
								</a>
							</Link>
						</div>
						<button
							type="submit"
							className="btn btn-primary btn-block"
							disabled={loading === true ? true : false}
						>
							{loading === true ? `LOADING...` : `LOGIN →`}
						</button>
						<Link href="/register">
							<a className="my-4 btn btn-link btn-sm btn-block">
								No account yet? register
							</a>
						</Link>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login
Login.Template = AuthTemplate
