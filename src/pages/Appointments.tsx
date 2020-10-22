import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setUserAppointments } from '../actions';
import { request } from '../api/apiConfig';
import toast from '../components/toast';
import AppointmentItem from '../components/AppointmentItem';

const Appointments: React.FC = () => {
  const user = useSelector((state: RootStateOrAny) => state.userData);
  const userAppoint = useSelector(
    (state: RootStateOrAny) => state.appointments,
  );
  const services = useSelector((state: RootStateOrAny) => state.services);
  const [busy, setBusy] = useState<boolean>(false);

  const dispatch = useDispatch();

  useIonViewWillEnter(() => {
    setBusy(true);
    request(user.token, 'appointments', 'GET', {}).then(data => {
      setBusy(false);
      if (data.error) {
        toast(user.error, 4000);
      } else {
        dispatch(setUserAppointments(data));
      }
    });
  });

  if (userAppoint && services) {
    userAppoint.map((app: any) => {
      const service = services.filter(
        (service: any) => service.id === app.service_id,
      );
      return Object.assign(app, service[0]);
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Appointments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Appontments</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLoading
          message="Registration in Progress..."
          duration={0}
          isOpen={busy}
        />
        <IonButton
          className="ion-margin"
          expand="full"
          routerLink="/vehicle-service-booking/serviceform"
        >
          {userAppoint !== undefined && userAppoint.length > 0
            ? 'Book another service'
            : 'Book your first service'}
        </IonButton>

        {userAppoint ? (
          userAppoint.map((appoint: any) => (
            <AppointmentItem
              key={appoint.id + Math.random()}
              appoint={appoint}
            />
          ))
        ) : (
          <IonLoading
            message="Getting your services..."
            duration={0}
            isOpen={busy}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Appointments;
