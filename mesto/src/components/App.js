import { useState, useEffect } from "react";
import { Route, Link, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Header from "./header/Header.js";
import Main from "./main/Main.js";
import Footer from "./footer/Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { userContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
	const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);

	const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

	const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

	const [isImagePopupOpen, setImagePopupOpen] = useState(false);

	const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

	const [selectedCard, setSelectedCard] = useState(null);

	const [currentUser, setCurrentUser] = useState({});

	const [cards, setCards] = useState([]);

	useEffect(() => {
		api
			.getUserInfo()
			.then((userData) => {
				setCurrentUser(userData);
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке данных с сервера: ${err}`);
			});
	}, []);

	useEffect(() => {
		api
			.getCards()
			.then((cards) => {
				setCards(cards);
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке карточек с сервера: ${err}`);
			});
	}, []);

	function handleCardLike(card, isOwnLiked) {
		api
			.toggleCardLikeStatus(card._id, isOwnLiked)
			.then((newCard) => {
				setCards(
					cards.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
				);
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке данных с сервера: ${err}`);
			});
	}

	function handleCardDelete(card) {
		api
			.deleteCard(card._id)
			.then(() => {
				const updCards = cards.filter((oldCard) => oldCard._id !== card._id);
				setCards(updCards);
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке данных с сервера: ${err}`);
			});
	}

	function clearCardDelay() {
		setSelectedCard(null);
	}

	function closeAllPopups() {
		setImagePopupOpen(false);
		setEditProfilePopupOpen(false);
		setAddPlacePopupOpen(false);
		setEditAvatarPopupOpen(false);
		setTimeout(clearCardDelay, 500);
	}

	function handleEditProfileClick() {
		setEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setAddPlacePopupOpen(true);
	}

	function handleEditAvatarClick() {
		setEditAvatarPopupOpen(true);
	}

	function handleCardClick(selectedCard) {
		setSelectedCard(selectedCard);
		setImagePopupOpen(true);
	}

	function handleUpdateUser(userInfo) {
		api
			.setUserInfo(userInfo)
			.then((userData) => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке данных пользователя: ${err}`);
			});
	}

	function handleUpdateUserAvatar(avatarInfo) {
		api
			.setAvatar(avatarInfo)
			.then((userData) => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке аватара пользователя: ${err}`);
			});
	}

	function handleAddPlaceSubmit(CardData) {
		api
			.addCard(CardData)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(`Ошибка при загрузке карточек с сервера: ${err}`);
			});
	}
	let loggedIn = false;

	return (
		<userContext.Provider value={currentUser}>
			<div className="page__content">
				<Header linkText="Войти" linkPath="sign-up" userEmail="email@mail" />

				<Switch>
					<ProtectedRoute
						exact
						path="/"
						loggedIn={loggedIn}
						component={Main}
						onEditProfile={handleEditProfileClick}
						onAddPlace={handleAddPlaceClick}
						onEditAvatar={handleEditAvatarClick}
						onCardClick={handleCardClick}
						cards={cards}
						onCardLike={handleCardLike}
						onCardDelete={handleCardDelete}
					/>

					<Route path="/sign-up">
						<Register />
					</Route>
					<Route path="/sign-in">
						<Login />
					</Route>
					<Route>
						{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
					</Route>
				</Switch>

				<Footer />

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateUserAvatar}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
				/>

				<PopupWithForm
					name="confirmation"
					title="Вы уверены?"
					button="Да"
					popupContainer="popup__container"
					popupContent="popup__container_content_confirmation"
					onClose={closeAllPopups}
				/>

				<ImagePopup
					name="zoom-img"
					card={selectedCard}
					onClose={closeAllPopups}
					isOpen={isImagePopupOpen}
				/>

				<InfoTooltip
					name="infoTooltip"
					isOpen={isInfoTooltipOpen}
					onClose={closeAllPopups}
				/>
			</div>
		</userContext.Provider>
	);
}

export default App;
