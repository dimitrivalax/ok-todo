import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import i18next from 'i18next';
import global_en from "./translations/en/global.json";
import global_fr from "./translations/fr/global.json";
import { I18nextProvider } from 'react-i18next';
import { ActionPerformed, LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';

i18next.init({
  interpolation: { escapeValue: false },
  lng: "fr",
  resources: {
    fr: {
      global: global_fr,
    },
    en: {
      global: global_en,
    }
  },
});

  LocalNotifications.addListener('localNotificationReceived',(notification : LocalNotificationSchema) => {
    console.log('NOTIF RECEVEID ::: ', JSON.stringify(notification))
  })

  LocalNotifications.addListener('localNotificationActionPerformed',(notification : ActionPerformed) => {
    LocalNotifications.removeAllDeliveredNotifications();
  })

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);