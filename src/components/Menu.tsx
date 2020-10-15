import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { listOutline, mailOutline} from 'ionicons/icons';
import './Menu.css';
import { RootStateOrAny, useSelector } from 'react-redux';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Appointments',
    url: '/appointments',
    iosIcon: mailOutline,
    mdIcon: listOutline
  },
  {
    title: 'Login',
    url: '/login',
    iosIcon: mailOutline,
    mdIcon: listOutline
  },
];


const Menu: React.FC = () => {
  const location = useLocation();
  
  const user = useSelector((state: RootStateOrAny) => state.userData.user)
  // const user = {
  //   username: 'Azeem',
  //   email: 'azeem@example.com'
  // }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Welcome {user.username}</IonListHeader>
          <IonNote>{user.email}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
