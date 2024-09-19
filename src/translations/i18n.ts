import i18next from 'i18next';
import global_en from "./../translations/en/global.json";
import global_fr from "./../translations/fr/global.json";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "fr",
	debug: true,
	resources: {
		fr: {
			translation: global_fr,
		},
		en: {
			translation: global_en,
		}
	},
}, (err, t) => {
	console.log('i18next ::: INITIALIZED', t('Home.title'))
});



export default i18next;