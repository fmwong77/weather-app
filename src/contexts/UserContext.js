import React, { createContext, Component } from 'react';
export const UserContext = createContext();

class UserContextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			isAuthenticated: false
		};
	}

	userSignUp = (username) => {
		this.setState({ username: username });
	};

	toggleisAuthenticated = () => {
		this.setState({ isAuthenticated: !this.isAuthenticated });
	};

	render() {
		return (
			<UserContext.Provider
				value={{
					...this.state,
					userSignUp: this.userSignUp,
					toggleisAuthenticated: this.toggleisAuthenticated
				}}
			>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

export default UserContextProvider;
