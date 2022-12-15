import PopupWithForm from "./PopupWithForm.js";
import InputText from "./InputText.js";
import InputLink from "./InputLink.js";

import { useEffect, useState } from "react";

export default function AddPlacePopup(props) {
	function handleFormSubmit(e) {
		e.preventDefault();
		props.onAddPlace({
			name: place,
			link: placeLink,
		});
	}

	const [place, setPlace] = useState("");
	const [placeLink, setPlaceLink] = useState("");

	useEffect(() => {
		setPlace("");
		setPlaceLink("");
	}, [props.isOpen]);

	function handlePlaceChange(e) {
		setPlace(e.target.value);
	}

	function handlePlaceLinkChange(e) {
		setPlaceLink(e.target.value);
	}

	return (
		<PopupWithForm
			name="add-card"
			title="Новое место"
			button="Создать"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleFormSubmit}
			popupContainer="popup__container"
		>
			<InputText
				id="place-input"
				type="text"
				name="name"
				className="popup__input popup__input_type_img-title"
				placeholder="Описание места"
				value={place}
				minLength={2}
				maxLength={30}
				required={true}
				onChange={handlePlaceChange}
			/>
			<InputLink
				id="img-input"
				type="url"
				name="link"
				className="popup__input popup__input_type_img-link"
				placeholder="Ссылка на картинку"
				value={placeLink}
				pattern="https?://.+"
				required={true}
				onChange={handlePlaceLinkChange}
			/>
		</PopupWithForm>
	);
}
