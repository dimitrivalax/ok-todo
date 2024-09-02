import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation("global");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Home.title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t('Home.title')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={t('Home.title')} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
