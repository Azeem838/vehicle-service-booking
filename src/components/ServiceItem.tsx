import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonIcon,
} from '@ionic/react';
import React from 'react';
import PropTypes from 'prop-types';
import { logoInstagram, logoTwitter, logoFacebook } from 'ionicons/icons';
import ServiceImage from '../assets/images/mechanic-apps.png';

export interface ServiceItemProps {
  service: any;
  handleCardClick: any;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  handleCardClick,
}) => (
  <IonCol sizeXs="12" sizeMd="3">
    <IonCard style={{ boxShadow: 'none' }}>
      <div className="ion-text-center">
        <img
          style={{ borderRadius: '50%', width: '15em' }}
          src={ServiceImage}
          alt="service"
        />
        <IonCardHeader>
          <IonCardTitle>{service.service_type}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, earum?
        </IonCardContent>
        <IonButton
          className="ion-margin-bottom"
          color="secondary"
          id="Quick Service"
          onClick={handleCardClick}
          fill="outline"
          expand="full"
        >
          Learn More
        </IonButton>
        <IonIcon
          className="ion-margin-bottom"
          size="small"
          icon={logoFacebook}
        />
        <IonIcon
          className="ion-margin-start ion-margin-bottom"
          size="small"
          icon={logoTwitter}
        />
        <IonIcon
          className="ion-margin-start ion-margin-bottom"
          size="small"
          icon={logoInstagram}
        />
      </div>
    </IonCard>
  </IonCol>
);

ServiceItem.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number,
    service_type: PropTypes.string,
  }).isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default ServiceItem;
