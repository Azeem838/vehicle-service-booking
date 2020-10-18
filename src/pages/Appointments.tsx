import { IonAvatar, IonButton, IonButtons, IonChip, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setUserAppointments, setServices } from '../actions';
import { request } from '../api/apiConfig';
import ExploreContainer from '../components/ExploreContainer';
import { toast } from '../components/toast';
import './Page.css';
import SericeImage from '../assets/images/mechanic-apps.png'
import moment from 'moment';

const Appointments: React.FC = () => {

  const user = useSelector((state: RootStateOrAny) => state.userData)
  const userAppoint = useSelector((state: RootStateOrAny) => state.appointments) 
  const services = useSelector((state: RootStateOrAny) => state.services)
  const [busy, setBusy] = useState<boolean>(false)

  const dispatch = useDispatch()

  useIonViewWillEnter(() => {
    setBusy(true)
    const appRequest = request(user.token, 'appointments', 'GET', {})
    const serviceRequest = request(user.token, 'services', 'GET', {})

    Promise.all([appRequest, serviceRequest])
      .then(data => {
        setBusy(false)
        if(data[0].error || data[1].error) {
          toast(user.error, 4000)
        } else {
          dispatch(setUserAppointments(data[0]))
          console.log(data[0])
          dispatch(setServices(data[1]))
        }
      })
  })

  if(userAppoint && services) {
    userAppoint.map((app: any) => {
      const service = services.filter((service: any) => {
        return service.id === app.service_id
      })
      Object.assign(app, service[0])
    })
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
        <IonLoading message="Registration in Progress..." duration={0} isOpen={busy} /> 
        <IonButton className="ion-margin" expand="full" routerLink="/serviceform" >{userAppoint !== undefined && userAppoint.length > 0 ? 'Book another service' : 'Book your first service'}</IonButton>

          {userAppoint ? userAppoint.map((appoint: any) => {
            return (
              <IonGrid key={appoint.id + Math.random()}>
              <IonRow className='ion-justify-content-center'>
                <h3>Your next service: {moment(appoint.start_time).fromNow()}</h3>
              </IonRow>
                <IonRow className="ion-justify-content-around">

                  <IonCol sizeXs="10" sizeMd="4" >
                    <IonList lines="none">

                      <IonItem>
                          <IonChip color="success" style={{maxWidth: "100%", margin: "0 auto"}}>
                            <IonLabel>Date & Time</IonLabel>
                          </IonChip>
                      </IonItem>
                      <div className="ion-text-center"><IonLabel>{moment(appoint.start_time).format('MMMM Do YYYY, h:mm:ss a')}</IonLabel></div>
          
                      <IonItem>
                        <IonChip color="success" style={{maxWidth: "100%", margin: "0 auto"}}>
                          <IonLabel>Service Type</IonLabel>
                        </IonChip>
                      </IonItem>
                      <div className="ion-text-center"><IonLabel>{appoint.service_type}</IonLabel></div>

                      <IonItem>
                        <IonChip color="success" style={{maxWidth: "100%", margin: "0 auto"}}>
                          <IonLabel>Description</IonLabel>
                        </IonChip>
                      </IonItem>
                      <div className="ion-text-center"><IonLabel>{appoint.description}</IonLabel></div>

        
                      <IonItem>
                        <IonChip color="success" style={{maxWidth: "100%", margin: "0 auto"}}>
                          <IonLabel>Estimated Time</IonLabel>
                        </IonChip>
                      </IonItem>
                      <div className="ion-text-center"><IonLabel>{appoint.allocated_time} hours</IonLabel></div>

                    </IonList>
                  </IonCol>

                  <IonCol sizeXs="10" sizeMd="6" sizeXl="4">
                    <img alt="appointment" src={SericeImage} /> 
                  </IonCol>
                </IonRow>
            </IonGrid>
            )
          }) : (
            <>
              <IonLoading message="Getting your services..." duration={0} isOpen={busy} /> 
              <IonHeader>
                <IonTitle>No Appointments yet...</IonTitle>
                <IonButton routerLink="/serviceform">Book your first service</IonButton>
            </IonHeader>
            </>
            )
          }              
        </IonContent>
    </IonPage>
  );
};

export default Appointments;
