import { IonAvatar, IonButton, IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow } from '@ionic/react'
import React from 'react'
import Finn from '../assets/images/avatar-finn.png'
import Han from '../assets/images/avatar-han.png'
import Rey from '../assets/images/avatar-rey.png'

export interface ServiceDetailsProps {
  service: any
  active: any
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({service, active}) => {
  return (
    <IonGrid className="ion-margin-horizontal" key={service.id} style={ active === `${service.service_type}` ? {display: "inline"} : {display: "none"}}>
        <IonRow className="ion-justify-content-around">

        <IonCol sizeXs="11" sizeMd="9">
          <img alt="service" src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          <IonButton fill="outline" strong={true} routerLink="/serviceform" className="ion-float-right">Book Now</IonButton>
          <p>Typically: {service.allocated_time} hours</p>
          <h3>What is a {service.service_type === 'Other' ? 'Custom Service' : service.service_type}?</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio eaque molestias quibusdam cupiditate porro, culpa enim eos ipsum nulla molestiae omnis repellat dolorem nemo excepturi expedita iusto nostrum maxime vel.</p>
          <h3>Why service with us?</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae esse sit eum ipsum placeat molestias harum illo consectetur consequatur ducimus beatae libero et, excepturi illum accusantium error voluptatem, tenetur voluptatum?</p>
          <h3>What are people saying?</h3>
          
          <IonList>
            <IonItem>
              <IonAvatar slot="start">
                <img alt="avatar" src={Finn} />
              </IonAvatar>
              <IonLabel>
                <h2>Finn</h2>
                <h3 color="primary">Excellent service!</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, voluptatum!</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonAvatar slot="start">
                <img alt="avatar" src={Han} />
              </IonAvatar>
              <IonLabel>
                <h2>Han</h2>
                <h3 color="primary">Clean and fast!</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, voluptatum!</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonAvatar slot="start">
                <img alt="avatar" src={Rey} />
              </IonAvatar>
              <IonLabel>
                <h2>Rey</h2>
                <h3 color="primary">Highly Recommend!</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, voluptatum!</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCol>
      
      </IonRow>
    </IonGrid>
  )
}

export default ServiceDetails