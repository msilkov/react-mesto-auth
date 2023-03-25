import { authUrl } from './utils';

const request = ({ url, method = "POST", token, data }) => {
	return fetch(`${authUrl}${url}`, {
		method,
		headers: {
			"Content-Type": "application/json",
			...(!!token && { Authorization: `Bearer ${token}` }),
		},
		...(!!data && { body: JSON.stringify(data) }),
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(res.status);
	});
};

export const register = (password, email) => {
	return request({
		url: "/signup",
		data: { password, email },
	});
};

export const authorize = (password, email) => {
	return request({
		url: "/signin",
		data: { password, email },
	});
};

export const getContent = (token) => {
	return request({
		url: "/users/me",
		method: "GET",
		token,
	});
};
