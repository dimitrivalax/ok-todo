import { IonAvatar, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useTranslation } from 'react-i18next';

interface Props {

}

const TaskForm: React.FC<Props> = (props) => {
  const { t } = useTranslation("global");

  return (
    <>
      <IonList>
        <IonItem>
          <IonInput label={t('Home.what')} labelPlacement="floating"></IonInput>
        </IonItem>
        <IonItem>
          <IonSelect label={t('Home.when')} labelPlacement="floating" interface="popover">
            <IonSelectOption value={t('Home.today')}>{t('Home.today')}</IonSelectOption>
            <IonSelectOption value={t('Home.tomorrow')}>{t('Home.tomorrow')}</IonSelectOption>
            <IonSelectOption value={t('Home.next_week')}>{t('Home.next_week')}</IonSelectOption>
            <IonSelectOption value={t('Home.one_day')}>{t('Home.one_day')}</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
      <IonButton className="ion-float-right ion-margin-top">
      {t('Home.save')}
      </IonButton>
    </>
  );
};

export default TaskForm;
