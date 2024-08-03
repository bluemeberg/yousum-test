export function setUserId(userId) {
	if (window.gtag) {
		window.gtag("config", "YOUR_GA4_MEASUREMENT_ID", {
			user_id: userId,
		});
	}
}

export function setUserProperties(properties) {
	if (window.gtag) {
		window.gtag("set", "user_properties", properties);
	}
}

export function getAnonymousId() {
	let anonymousId = localStorage.getItem("anonymousId");
	if (!anonymousId) {
		anonymousId = generateAnonymousId();
		localStorage.setItem("anonymousId", anonymousId);
	}
	return anonymousId;
}

export function trackButtonClick(eventCategory, eventAction, eventLabel) {
	if (window.gtag) {
		window.gtag("event", eventAction, {
			event_category: eventCategory,
			event_label: eventLabel,
		});
	}
}

function generateAnonymousId() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
