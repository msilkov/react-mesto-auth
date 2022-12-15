import logo from "../../images/logo/logo.svg";

export default function Header() {
	return (
		<header className="header section section_size_narrow page__header">
			<a href="#" className="logo">
				<img src={logo} alt="Место - Россия" className="logo__icon" />
			</a>
		</header>
	);
}
