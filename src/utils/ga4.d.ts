declare module "../../utils/ga4.js" {
	export function setUserId(userId: string): void;
	export function setUserProperties(properties: Record<string, any>): void;
	export function getAnonymousId(): string;
	export function trackButtonClick(eventCategory: string, eventAction: string, eventLabel: string): void;
}
