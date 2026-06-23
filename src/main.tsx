import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { I18nextProvider } from 'react-i18next';
import { ActionPerformed, LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';
import i18next from './translations/i18n';



  LocalNotifications.addListener('localNotificationReceived',(notification : LocalNotificationSchema) => {
    console.log('NOTIF RECEVEID ::: ', JSON.stringify(notification))
  })

  LocalNotifications.addListener('localNotificationActionPerformed',(_notification : ActionPerformed) => {
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