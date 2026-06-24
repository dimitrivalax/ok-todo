import i18next from 'i18next';
import global_en from "./../translations/en/global.json";
import global_fr from "./../translations/fr/global.json";

const SUPPORTED_LANGUAGES = ['fr', 'en'];
const FALLBACK_LANGUAGE = 'en';

function detectLanguage(): string {
	const browserLang = (typeof navigator !== 'undefined' && navigator.language
		? navigator.language
		: FALLBACK_LANGUAGE).split('-')[0];
	return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : FALLBACK_LANGUAGE;
}

i18next.init({
	interpolation: { escapeValue: false },
	lng: detectLanguage(),
	fallbackLng: FALLBACK_LANGUAGE,
	resources: {
		fr: {
			translation: global_fr,
		},
		en: {
			translation: global_en,
		}
	},
});


export default i18next;
