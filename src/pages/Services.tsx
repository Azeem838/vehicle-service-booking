import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar} from '@ionic/react';
import { logoInstagram, logoTwitter, logoFacebook } from 'ionicons/icons';
import React, { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import './Page.css';
import SericeImage from '../assets/images/mechanic-apps.png'
import Finn from '../assets/images/avatar-finn.png'
import Han from '../assets/images/avatar-han.png'
import Rey from '../assets/images/avatar-rey.png'

const Services: React.FC = () => {

  const services = useSelector((state: RootStateOrAny) => state.services)

  const [active, setActive] = useState<string>('all')

  const handleActive = (e: any) => {
    const val = e.target.value
    setActive(val)
  }

  const handleCardClick = (e: any) => {
    const val = e.target.id
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

        <IonGrid style={ active === `all` ? {display: "inline"} : {display: "none"}}>
          <IonRow>
            <IonCol>
              <div className="ion-text-center"><IonTitle size="large">Choose your service</IonTitle></div>
              <IonTitle className="ion-text-center" size="small">Select a serivce to learn more</IonTitle>              
            </IonCol>
          </IonRow>

          <IonRow className='ion-justify-content-center'>
            <IonCol sizeXs="12" sizeMd="3">
              <IonCard style={{boxShadow: "none"}}>
                <div className="ion-text-center">
                <img style={{borderRadius: "50%", width: "15em"}} src={SericeImage} alt="service"/>
                <IonCardHeader>
                  <IonCardTitle>Quick Service</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, earum?
                </IonCardContent>
                <IonButton className="ion-margin-bottom" color="secondary" id="Quick Service" onClick={handleCardClick} fill="outline" expand="full">Learn More</IonButton>
                  <IonIcon className="ion-margin-bottom" size="small" icon={logoFacebook}/>
                  <IonIcon className="ion-margin-start ion-margin-bottom" size="small" icon={logoTwitter} />
                  <IonIcon className="ion-margin-start ion-margin-bottom" size="small" icon={logoInstagram} />
                </div>
              </IonCard>              
            </IonCol>
            <IonCol sizeXs="12" sizeMd="3">
            <IonCard style={{boxShadow: "none"}}>
                <div className="ion-text-center">
                <img style={{borderRadius: "50%", width: "15em"}} src={SericeImage} alt="service"/>
                <IonCardHeader>
                  <IonCardTitle>Full Service</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, earum?
                </IonCardContent>
                <IonButton className="ion-margin-bottom" color="secondary" id="Full Service" onClick={handleCardClick} fill="outline" expand="full">Learn More</IonButton>
                  <IonIcon className="ion-margin-bottom" size="small" icon={logoFacebook}/>
                  <IonIcon className="ion-margin-start ion-margin-bottom" size="small" icon={logoTwitter} />
                  <IonIcon className="ion-margin-start ion-margin-bottom" size="small" icon={logoInstagram} />
                </div>
              </IonCard> 
            </IonCol>
            <IonCol sizeXs="12" sizeMd="3">
            <IonCard style={{boxShadow: "none"}}>
                <div className="ion-text-center">
                <img style={{borderRadius: "50%", width: "15em"}} src={SericeImage} alt="service"/>
                <IonCardHeader>
                  <IonCardTitle>Custom Service</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, earum?
                </IonCardContent>
                <IonButton className="ion-margin-bottom" color="secondary" id="Other" onClick={handleCardClick} fill="outline" expand="full">Learn More</IonButton>
                  <IonIcon className="ion-margin-bottom" size="small" icon={logoFacebook}/>
                  <IonIcon className="ion-margin-start ion-margin-bottom" size="small" icon={logoTwitter} />
                  <IonIcon className="ion-margin-start ion-margin-bottom" size="small" icon={logoInstagram} />
                </div>
              </IonCard> 
            </IonCol>
          </IonRow>
        </IonGrid>



        {services.map((service: any) => {
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
        })}
      </IonContent>
    </IonPage>
  );
};

export default Services;
