import { Component } from "react"
import cookies from "nookies"
import Router from "next/router"

/*
 * Check for authentication
 */
const authenticate = (ctx) => {
	const { _token } = cookies.get(ctx)
	// if we are on server side and cookie isn't present
	if (ctx.req && !_token) {
		ctx.res.writeHead(302, { Location: "/login" })
		ctx.res.end()
		return
	}
	// if we are on client side and cookie isn't present
	if (!_token) {
		Router.push("/login")
	}
	// else return the token
	return _token
}

const isAuthenticated = (ctx) => {
	const { _token } = cookies.get(ctx)

	return _token
}

const withAuthorization = (WrappedComponent) => {
	return class extends Component {
		static async getInitialProps(ctx) {
			const token = authenticate(ctx)
			/*
			 * check if the wrapped component have getInitialProps
			 * and if it has a context
			 * then return component props
			 */
			const componentProps =
				WrappedComponent.getInitialProps &&
				(await WrappedComponent.getInitialProps(ctx))
			return { ...componentProps, token }
		}
		render() {
			return <WrappedComponent {...this.props} />
		}
	}
}

export { withAuthorization, isAuthenticated }
