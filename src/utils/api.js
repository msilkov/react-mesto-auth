import { apiUrl, token } from "./utils.js";

class Api {
	constructor({ apiUrl, headers }) {
		this._apiUrl = apiUrl;
		this._headers = headers;
	}

	_onResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	_request(url, options) {
		return fetch(url, options).then(this._onResponse);
	}

	getUserInfo() {
		return this._request(`${this._apiUrl}/users/me`, {
			method: "GET",
			headers: this._headers,
		});
	}

	getCards() {
		return this._request(`${this._apiUrl}/cards`, {
			method: "GET",
			headers: this._headers,
		});
	}

	addCard({ name, link }) {
		return this._request(`${this._apiUrl}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({ name, link }),
		});
	}

	deleteCard(cardId) {
		return this._request(`${this._apiUrl}/cards/${cardId}`, {
			method: "DELETE",
			headers: this._headers,
			body: JSON.stringify({ cardId }),
		});
	}

	setUserInfo({ name, about }) {
		return this._request(`${this._apiUrl}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ name, about }),
		});
	}

	setAvatar({ avatar }) {
		return this._request(`${this._apiUrl}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ avatar }),
		});
	}

	toggleCardLikeStatus(cardId, isOwnLiked) {
		return this._request(`${this._apiUrl}/cards/${cardId}/likes`, {
			method: `${isOwnLiked ? "DELETE" : "PUT"}`,
			headers: this._headers,
			body: JSON.stringify(),
		});
	}
}

const api = new Api({
	apiUrl: apiUrl,
	headers: {
		authorization: token,
		"Content-Type": "application/json",
	},
});

export default api;
