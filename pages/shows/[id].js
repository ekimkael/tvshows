import React from "react"
import Navbar from "../../organisms/Navbar"
import parse from "html-react-parser"
import { withAuthorization } from "../../utils/withAuthorization"

function ShowID({ show }) {
	return (
		<>
			<Navbar />
			<div className="container py-5">
				<div className="row">
					<div className="col-md-5">
						<img src={show.image.original} className="img-fluid" />
					</div>
					<div className="col-md-7">
						<section className="mb-4">
							<h1>
								<b>{show.name}</b>
							</h1>
							<h5 className="text-muted">{show.type}</h5>
						</section>
						{parse(show.summary)}
						{show.genres.map((genre, index) => (
							<span key={index} className="badge alert-primary mr-1">
								{genre}
							</span>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

ShowID.getInitialProps = async (ctx) => {
	let show
	await fetch(`https://api.tvmaze.com/shows/${ctx.query.id}`)
		.then((response) => response.json())
		.then((datas) => (show = datas))
	return { show }
}
export default withAuthorization(ShowID)
