import logo from "../../images/logo/logo.svg";
import { Link } from "react-router-dom";

export default function Header(props) {
	return (
		<header className="header section section_size_narrow page__header">
			<a href="#" className="logo">
				<img src={logo} alt="Место - Россия" className="logo__icon" />
			</a>
			<div class="header__auth">
				<p class="header__auth-email">{props.userEmail}</p>
				<Link
					to={props.linkPath}
					class="header__auth-link header__auth-link_active"
					href="#"
				>
					{props.linkText}
				</Link>
			</div>
		</header>
	);
}
