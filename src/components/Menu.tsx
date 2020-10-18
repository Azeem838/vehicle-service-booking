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
import { hammerOutline, listOutline, logOutOutline, mailOutline, documentTextOutline} from 'ionicons/icons';
import './Menu.css';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setLogout} from '../actions/index'

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
    title: 'Services',
    url: '/services',
    iosIcon: mailOutline,
    mdIcon: hammerOutline
  },
  {
    title: 'Book a service',
    url: '/serviceform',
    iosIcon: mailOutline,
    mdIcon: documentTextOutline
  },
];


const Menu: React.FC = () => {
  const location = useLocation();
  
  const user = useSelector((state: RootStateOrAny) => state.userData.user)
  const dispatch = useDispatch()  

  const handleLogout = () => dispatch(setLogout())

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
          <IonMenuToggle autoHide={false}>
            <IonItem className={location.pathname === 'logout' ? 'selected' : ''} onClick={handleLogout} routerDirection="none" lines="inset" detail={false}>
              <IonIcon slot="start" ios={mailOutline} md={logOutOutline} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
