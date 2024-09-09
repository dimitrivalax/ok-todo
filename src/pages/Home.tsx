import { IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useTranslation } from 'react-i18next';
import HomeContainer from '../components/home/HomeContainer';

const Home: React.FC = () => {
  const { t } = useTranslation("global");
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color='primary'>
          <IonTitle>{t('Home.title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t('Home.title')}</IonTitle>
          </IonToolbar>
        </IonHeader>
          <HomeContainer></HomeContainer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
