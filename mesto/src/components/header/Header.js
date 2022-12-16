import logo from "../../images/logo/logo.svg";
import { Link } from "react-router-dom";

export default function Header(props) {
	return (
		<header className="header section section_size_narrow page__header">
			<a href="#" className="logo">
				<img src={logo} alt="Место - Россия" className="logo__icon" />
			</a>
			<div className="header__auth">
				<p className="header__auth-email">{props.userEmail}</p>
				<Link
					to={props.linkPath}
					className="header__auth-link header__auth-link_active"
				>
					{props.linkText}
				</Link>
			</div>
		</header>
	);
}
