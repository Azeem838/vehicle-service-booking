import Menu from './components/Menu';
import Appointments from './pages/Appointments';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { RootStateOrAny, useSelector } from 'react-redux';

const App: React.FC = () => {

  const user = useSelector((state: RootStateOrAny) => state.userData)

  return (
    <IonApp>      
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {user !== undefined ? (<Menu />) : null}
          <IonRouterOutlet id="main">
          {user !== undefined ? ( 
            <Route path="/appointments" component={Appointments} exact /> )
          : ( <Redirect to="/login" /> )}
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );

};

export default App;
