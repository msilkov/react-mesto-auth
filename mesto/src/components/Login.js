export default function Login() {
	return (
		<section className="login section section_size_narrow page__section">
			<h2 className="login__title">Вход</h2>
			<div className="login__content">
				<form className="login__form">
					<input
						id="email-input"
						type="email"
						name="email"
						className="login__input"
						placeholder="Email"
						defaultValue=""
						minLength={2}
						maxLength={30}
						required=""
					/>
					<input
						id="password-input"
						type="password"
						name="password"
						className="login__input"
						placeholder="Пароль"
						defaultValue=""
						minLength={2}
						maxLength={30}
						required=""
					/>
					<button type="submit" className="login__submit-btn">
						Войти
					</button>
				</form>
			</div>
		</section>
	);
}
