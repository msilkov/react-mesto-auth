import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
	return (
		<section className="register section section_size_narrow page__section">
			<h2 className="register__title">Регистрация</h2>
			<div className="register__content">
				<form className="register__form">
					<input
						id="email-input"
						type="email"
						name="email"
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
						className="register__input"
						placeholder="Пароль"
						defaultValue=""
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
