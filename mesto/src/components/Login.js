import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialUserData = {
	email: "",
	password: "",
};

export default function Login(props) {
	const [userData, setUserData] = useState(initialUserData);

	function handleChangeData(e) {
		const { name, value } = e.target;
		setUserData((oldData) => ({
			...oldData,
			[name]: value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();

		const { password, email } = userData;

		if (!password || !email) return;

		props.onLogin(password, email);
	}

	return (
		<section className="login section section_size_narrow page__section">
			<h2 className="login__title">Вход</h2>
			<div className="login__content">
				<form className="login__form" onSubmit={handleSubmit}>
					<input
						id="email-input"
						type="email"
						name="email"
						className="login__input"
						placeholder="Email"
						value={userData.email}
						minLength={2}
						maxLength={30}
						required=""
						onChange={handleChangeData}
					/>
					<input
						id="password-input"
						type="password"
						name="password"
						className="login__input"
						placeholder="Пароль"
						value={userData.password}
						minLength={2}
						maxLength={30}
						required=""
						onChange={handleChangeData}
					/>
					<button type="submit" className="login__submit-btn">
						Войти
					</button>
				</form>
			</div>
		</section>
	);
}
