export const trackButtonClick = (eventCategory, eventAction, eventLabel) => {
	if (window.gtag) {
		window.gtag("event", eventAction, {
			event_category: eventCategory,
			event_label: eventLabel,
		});
	}
};

export const generateAnonymousId = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export const getAnonymousId = () => {
	let anonymousId = localStorage.getItem("anonymousId");
	if (!anonymousId) {
		anonymousId = generateAnonymousId();
		localStorage.setItem("anonymousId", anonymousId);
	}
	return anonymousId;
};

export const setUserId = (userId) => {
	if (window.gtag) {
		window.gtag("config", "G-0TXELKHBQT", {
			user_id: userId,
		});
	}
};

export const setUserProperties = (properties) => {
	if (window.gtag) {
		window.gtag("set", "user_properties", properties);
	}
};
