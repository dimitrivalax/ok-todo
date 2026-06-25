import i18next from 'i18next';
import global_en from "./../translations/en/global.json";
import global_fr from "./../translations/fr/global.json";
import global_de from "./../translations/de/global.json";
import global_es from "./../translations/es/global.json";
import global_it from "./../translations/it/global.json";
import global_pt from "./../translations/pt/global.json";
import global_nl from "./../translations/nl/global.json";
import global_da from "./../translations/da/global.json";
import global_sv from "./../translations/sv/global.json";
import global_fi from "./../translations/fi/global.json";
import global_el from "./../translations/el/global.json";
import global_pl from "./../translations/pl/global.json";
import global_cs from "./../translations/cs/global.json";
import global_sk from "./../translations/sk/global.json";
import global_hu from "./../translations/hu/global.json";
import global_ro from "./../translations/ro/global.json";
import global_bg from "./../translations/bg/global.json";
import global_hr from "./../translations/hr/global.json";
import global_sl from "./../translations/sl/global.json";
import global_et from "./../translations/et/global.json";
import global_lv from "./../translations/lv/global.json";
import global_lt from "./../translations/lt/global.json";
import global_ga from "./../translations/ga/global.json";
import global_mt from "./../translations/mt/global.json";

const SUPPORTED_LANGUAGES = [
	'fr', 'en', 'de', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'fi', 'el', 'pl',
	'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'et', 'lv', 'lt', 'ga', 'mt',
];
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
		fr: { translation: global_fr },
		en: { translation: global_en },
		de: { translation: global_de },
		es: { translation: global_es },
		it: { translation: global_it },
		pt: { translation: global_pt },
		nl: { translation: global_nl },
		da: { translation: global_da },
		sv: { translation: global_sv },
		fi: { translation: global_fi },
		el: { translation: global_el },
		pl: { translation: global_pl },
		cs: { translation: global_cs },
		sk: { translation: global_sk },
		hu: { translation: global_hu },
		ro: { translation: global_ro },
		bg: { translation: global_bg },
		hr: { translation: global_hr },
		sl: { translation: global_sl },
		et: { translation: global_et },
		lv: { translation: global_lv },
		lt: { translation: global_lt },
		ga: { translation: global_ga },
		mt: { translation: global_mt },
	},
});


export default i18next;
