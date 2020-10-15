import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonLoading,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from '../components/toast';
import {registerUser} from '../api/apiConfig'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../actions';

const Register: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [email, setEmail] = useState('')

  const user = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory()

  const register = () => {
    setBusy(true)

    if(password !== cpassword) {
      toast('Passwords do not match')
      return setBusy(false)
    }
    if (username.trim() === '' || password.trim() === '') {
      toast('Username and Password are required')
      return setBusy(false)
    }

    registerUser(username, email, password).then(user => {
      if(user.error) {
        toast(user.error, 4000)
      } else {
        toast('Registration successful')
        dispatch(setUser(user))
        history.push('/appointments')
      }
    });    
    setBusy(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Registration in Progress..." duration={0} isOpen={busy} /> 
      <IonContent className="ion-padding">
        <IonInput placeholder="Username" onIonChange={(e: any) => {setUsername(e.target.value)}} />
        <IonInput placeholder="Email" onIonChange={(e: any) => {setEmail(e.target.value)}} />
        <IonInput type="password" placeholder="Password" onIonChange={(e: any) => {setPassword(e.target.value)}}/>
        <IonInput type="password" placeholder="Confirm Password" onIonChange={(e: any) => {setCPassword(e.target.value)}}/>
        <IonButton onClick={register}>Register</IonButton>
        
        <p>Already have an account? <Link to="/login">Login</Link> </p>
      </IonContent>
    </IonPage>
  );
  
};

export default Register;