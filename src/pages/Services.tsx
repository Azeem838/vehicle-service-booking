import { IonAvatar, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { camera, bookmark } from 'ionicons/icons';
import React, { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import './Page.css';

const Services: React.FC = () => {

  const services = useSelector((state: RootStateOrAny) => state.services)

  const [active, setActive] = useState<string>('all')

  const segmentStyle = {
    display: 'none'
  }

  const handleActive = (e: any) => {
    const val = e.target.value
    setActive(val)
  }

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

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Services</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonToolbar>
          <IonSegment value={active} onIonChange={handleActive}>
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

        {services.map((service: any) => {
          return (
            <IonItem key={service.id} style={ active === `${service.service_type}` ? {display: "inline"} : {display: "none"}} >
              <IonAvatar slot="start">
                <img alt="service" src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              </IonAvatar>
              <IonLabel>{service.service_type}</IonLabel>
              <IonLabel>Typically: {service.allocated_time} hours</IonLabel>
            </IonItem>
          )
        })}
      </IonContent>
    </IonPage>
  );
};

export default Services;
