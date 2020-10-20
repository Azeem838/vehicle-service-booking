import { 
  IonPage,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/react';
import React from 'react';

const Home: React.FC = () => {
  return (
    <IonPage style={{background: "#96bf00"}}>
      <IonGrid>
        <IonRow className="ion-align-items-center" style={{height: "100%"}}>
          <IonCol>
            <div className="ion-padding">
              <div className="ion-text-center">
                <IonText color="muted" style={{color: "white"}}>
                    <h2>Welcome</h2>
                    <h3>Book a service today!</h3>
                    <hr style={{borderWidth: "1px"}}/>
                    <p>We offer a range of service from, quick to custom engine rebuilds - Book now to avoid disappointment</p>
                </IonText>
                <IonButton color="light" fill="outline" routerLink="/login">Login</IonButton>
                <IonButton color="light" routerLink="/register">Register</IonButton>
              </div>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
  
};

export default Home;