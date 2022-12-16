import Popup from "./Popup";
import failIcon from "../images/icons/fail-icon.svg";
export default function InfoTooltip(props) {
	return (
		<Popup
			className={`popup popup_type_${props.name} ${
				props.isOpen ? "popup_opened" : ""
			}`}
			onClose={props.onClose}
			isOpen={props.isOpen}
		>
			<div className="popup__container">
				<img
					className="popup__img popup__icon-infoTooltip"
					src={failIcon}
					alt="ошибка"
				/>
				<p className="popup__text">Что-то пошло не так! Попробуйте ещё раз.</p>
				<button
					type="reset"
					className="popup__close-btn"
					onClick={props.onClose}
				/>
			</div>
		</Popup>
	);
}
