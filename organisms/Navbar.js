import Link from "next/link"
import cookies from "nookies"
import { isAuthenticated } from "..//utils/withAuthorization"

const signout = () => {
	cookies.destroy(null, "_token")
}

function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<div className="container">
				<Link href="/">
					<a className="navbar-brand">
						<b>TVSHOWS</b>
					</a>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link href="/shows">
								<a className="nav-link">Shows</a>
							</Link>
						</li>

						<li className="nav-item">
							<Link href="/about">
								<a className="nav-link">About</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/contact">
								<a className="nav-link">Contact</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/terms">
								<a className="nav-link">Terms</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/privacy">
								<a className="nav-link">Privacy</a>
							</Link>
						</li>
					</ul>
				</div>

				<div
					className="collapse navbar-collapse justify-content-end"
					id="navbarNav"
				>
					<ul className="navbar-nav">
						{isAuthenticated() ? (
							<li className="nav-item">
								<button
									type="button"
									className="btn btn-primary"
									onClick={signout}
								>
									Logout
								</button>
							</li>
						) : (
							<>
								<li className="nav-item">
									<Link href="/login">
										<a className="nav-link">Login</a>
									</Link>
								</li>
								<li className="nav-item">
									<Link href="/register">
										<a className="nav-link">Register</a>
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
