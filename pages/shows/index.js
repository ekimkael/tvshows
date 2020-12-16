import Navbar from "../../organisms/Navbar"
import Link from "next/link"
import { withAuthorization } from "../../utils/withAuthorization"

function TVshows({ shows, token }) {
	return (
		<>
			<Navbar token={token} />
			<div className="container py-5">
				<h1 className="mb-5">
					<b>Shows</b>
				</h1>
				<div className="row">
					{shows.map((show) => (
						<div key={show.id} className="col-md-2 mb-4">
							<Link href="/shows/[id]" as={`/shows/${show.id}`}>
								<a className="text-decoration-none text-reset">
									<div className="card">
										<img
											src={show.image.medium}
											className="card-img-top"
											alt="..."
										/>
										{/* <div className="card-body">
											<h5 className="card-title">
												<b>{show.name}</b>
											</h5>
											<h6 className="card-subtitle mb-2 text-muted">
												{show.language}
											</h6>
											{show.genres.map((genre, index) => (
												<span key={index} className="badge alert-primary mr-1">
													{genre}
												</span>
											))}
										</div> */}
									</div>
								</a>
							</Link>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

TVshows.getInitialProps = async (ctx) => {
	let shows
	// console.log(process.browser)
	await fetch("https://api.tvmaze.com/shows")
		.then((response) => response.json())
		.then((datas) => (shows = datas))
	return { shows }
}

export default withAuthorization(TVshows)
