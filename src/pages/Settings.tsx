import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useTranslation } from 'react-i18next';
import HomeContainer from '../components/home/HomeContainer';
import SettingsContainer from '../components/settings/SettingsContainer';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color='primary'>
          <IonTitle>{t('Settings.title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t('Settings.title')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SettingsContainer></SettingsContainer>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
