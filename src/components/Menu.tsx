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
  IonToggle,
} from '@ionic/react';

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  hammerOutline,
  listOutline,
  logOutOutline,
  mailOutline,
  documentTextOutline,
  moon,
  sunnyOutline,
} from 'ionicons/icons';
import './Menu.css';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../actions/index';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Services',
    url: '/vehicle-service-booking/services',
    iosIcon: mailOutline,
    mdIcon: hammerOutline,
  },
  {
    title: 'Appointments',
    url: '/vehicle-service-booking/appointments',
    iosIcon: mailOutline,
    mdIcon: listOutline,
  },
  {
    title: 'Book a service',
    url: '/vehicle-service-booking/serviceform',
    iosIcon: mailOutline,
    mdIcon: documentTextOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  const user = useSelector((state: RootStateOrAny) => state.userData.user);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(setLogout());

  const [dark, setDark] = useState<boolean>(false);

  const toggleDarkModeHandler = () => {
    document.body.classList.toggle('dark');
    setDark(!dark);
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            Welcome
            {' '}
            {user.username}
          </IonListHeader>
          <IonNote>{user.email}</IonNote>
          {appPages.map(appPage => (
            <IonMenuToggle key={Math.random()} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon
                  slot="start"
                  ios={appPage.iosIcon}
                  md={appPage.mdIcon}
                />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
          <IonItem lines="none">
            <IonIcon slot="start" icon={dark ? sunnyOutline : moon} />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle
              slot="end"
              name="darkMode"
              onIonChange={toggleDarkModeHandler}
            />
          </IonItem>
          <IonMenuToggle autoHide={false}>
            <IonItem
              className={location.pathname === 'logout' ? 'selected' : ''}
              onClick={handleLogout}
              routerDirection="none"
              lines="inset"
              detail={false}
            >
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
