import {
  IonChip,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
} from '@ionic/react';
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ServiceImage from '../assets/images/mechanic-apps.png';

export interface AppointmentItemProps {
  appoint: any;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appoint }) => (
  <IonGrid key={appoint.id + Math.random()}>
    <IonRow className="ion-justify-content-center">
      <h3>
        Your next service:
        {moment(appoint.start_time).fromNow()}
      </h3>
    </IonRow>
    <IonRow className="ion-justify-content-around">
      <IonCol sizeXs="10" sizeMd="4">
        <IonList lines="none">
          <IonItem>
            <IonChip
              color="success"
              style={{ maxWidth: '100%', margin: '0 auto' }}
            >
              <IonLabel>Date & Time</IonLabel>
            </IonChip>
          </IonItem>
          <div className="ion-text-center">
            <IonLabel>
              {moment(appoint.start_time).format('MMMM Do YYYY, h:mm:ss a')}
            </IonLabel>
          </div>

          <IonItem>
            <IonChip
              color="success"
              style={{ maxWidth: '100%', margin: '0 auto' }}
            >
              <IonLabel>Service Type</IonLabel>
            </IonChip>
          </IonItem>
          <div className="ion-text-center">
            <IonLabel>{appoint.service_type}</IonLabel>
          </div>

          <IonItem>
            <IonChip
              color="success"
              style={{ maxWidth: '100%', margin: '0 auto' }}
            >
              <IonLabel>Description</IonLabel>
            </IonChip>
          </IonItem>
          <div className="ion-text-center">
            <IonLabel>{appoint.description}</IonLabel>
          </div>

          <IonItem>
            <IonChip
              color="success"
              style={{ maxWidth: '100%', margin: '0 auto' }}
            >
              <IonLabel>Estimated Time</IonLabel>
            </IonChip>
          </IonItem>
          <div className="ion-text-center">
            <IonLabel>
              {appoint.allocated_time}
              {' '}
              hours
            </IonLabel>
          </div>
        </IonList>
      </IonCol>

      <IonCol sizeXs="10" sizeMd="6" sizeXl="4">
        <img alt="appointment" src={ServiceImage} />
      </IonCol>
    </IonRow>
  </IonGrid>
);

AppointmentItem.propTypes = {
  appoint: PropTypes.shape({
    id: PropTypes.number,
    start_time: PropTypes.string,
    service_type: PropTypes.string,
    description: PropTypes.string,
    allocated_time: PropTypes.number,
  }).isRequired,
};

export default AppointmentItem;
