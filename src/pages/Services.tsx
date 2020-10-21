import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { request } from '../api/apiConfig';
import toast from '../components/toast';
import { setServices } from '../actions';
import mIcon1 from '../assets/images/mechanic-icon-1.png';
import mIcon2 from '../assets/images/mechanic-icon-2.png';
import mIcon3 from '../assets/images/mechanic-icon-3.png';
import ServiceDetails from '../components/ServiceDetails';
import ServiceItem from '../components/ServiceItem';

const Services: React.FC = () => {
  const user = useSelector((state: RootStateOrAny) => state.userData);

  const services = useSelector((state: RootStateOrAny) => state.services);
  const dispatch = useDispatch();

  const [active, setActive] = useState<string>('all');
  const [busy, setBusy] = useState<boolean>(false);

  const handleActive = (e: any) => {
    const val = e.target.value;
    setActive(val);
  };

  const handleCardClick = (e: any) => {
    const val = e.target.id;
    console.log(val)
    setActive(val);
  };

  const handleIcon = (type: string) => {
    if (type === 'Quick Service') {
      return mIcon1;
    }

    if (type === 'Full Service') {
      return mIcon2;
    }

    return mIcon3;
  };

  useIonViewWillEnter(() => {
    setBusy(true);
    request(user.token, 'services', 'GET', {}).then((data: any) => {
      setBusy(false);
      if (data.error) {
        toast(user.error, 4000);
      } else {
        dispatch(setServices(data));
      }
    });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Services</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading
        message="Registration in Progress..."
        duration={0}
        isOpen={busy}
      />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Services</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonToolbar>
          <IonSegment scrollable value={active} onIonChange={handleActive}>
            <IonSegmentButton value="all">
              <IonLabel>All Services</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Quick Service">
              <IonLabel>Quick Service</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Full Service">
              <IonLabel>Full Service</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Other">
              <IonLabel>Custom Service</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>

        <IonGrid
          style={active === 'all' ? { display: 'inline' } : { display: 'none' }}
        >
          <IonRow>
            <IonCol>
              <div className="ion-text-center">
                <IonTitle size="large">Choose your service</IonTitle>
              </div>
              <IonTitle className="ion-text-center" size="small">
                Select a service to learn more
              </IonTitle>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            {services ? (
              services.map((service: any) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  handleCardClick={handleCardClick}
                  icon={handleIcon(service.service_type) || ''}
                />
              ))
            ) : (
              <IonLoading
                message="Getting your services..."
                duration={0}
                isOpen={busy}
              />
            )}
          </IonRow>
        </IonGrid>

        {services ? (
          services.map((service: any) => (
            <ServiceDetails
              key={service.id}
              service={service}
              active={active}
              icon={handleIcon(service.service_type) || ''}
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

export default Services;
