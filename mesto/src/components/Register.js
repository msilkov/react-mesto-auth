import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";

export default function Register() {

	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});



	function handleChangeData(e) {
		const { name, value } = e.target;
		setUserData({
			...userData,
			[name]: value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();

		auth
			.register(userData.password, userData.email)
		

			
	}

	return (
		<section className="register section section_size_narrow page__section">
			<h2 className="register__title">Регистрация</h2>
			<div className="register__content">
				<form className="register__form" onSubmit={handleSubmit}>
					<input
						id="email-input"
						type="email"
						name="email"
						value={userData.email}
						onChange={handleChangeData}
						className="register__input"
						placeholder="Email"
						minLength={2}
						maxLength={30}
						required=""
					/>
					<input
						id="password-input"
						type="password"
						name="password"
						value={userData.password}
						onChange={handleChangeData}
						className="register__input"
						placeholder="Пароль"
						minLength={2}
						maxLength={30}
						required=""
					/>
					<button type="submit" className="register__submit-btn">
						Зарегистрироваться
					</button>
				</form>
				<div className="register__signin">
					<p className="register__login-text">Уже зарегистрированы?&nbsp;</p>
					<Link to="sign-in" className="register__login-link">
						Войти
					</Link>
				</div>
			</div>
		</section>
	);
}
