import { 
  IonPage,
  IonButton,
  IonInput,
  IonLoading,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Input, { InputProps } from "../components/Input";
import { object, string } from "yup";
import {loginUser} from '../api/apiConfig'
import { toast } from '../components/toast';
import {setUser} from '../actions/index'

const Login: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false)

  const validationSchema = object().shape({
    username: string().required(),
    password: string().required().min(6),
  });
  const { control, handleSubmit, errors } = useForm({
    validationSchema,
  });

  const formFields: InputProps[] = [
    {
      name: "username",
      label: "Username",
    },
    {
      name: "password",
      component: <IonInput type="password" clearOnEdit={false} />,
      label: "Password",
    },
  ];

  const history = useHistory()  

  const dispatch = useDispatch()

  const login = (data: any) => {
    setBusy(true)
    loginUser(`${data.username}`, `${data.password}`).then(user => {
      setBusy(false)
      if(user.error) {
        toast(user.error, 4000)
      } else {
        toast('Login successful')
        dispatch(setUser(user))
        history.push('/appointments')
      }
    });    
  }
  

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol>
              <div className="ion-padding">
                <IonText color="muted">
                  <div className="ion-text-center"><h2>Login</h2></div>
                </IonText>
                <IonLoading message="Please wait..." duration={0} isOpen={busy} /> 
      
                <form onSubmit={handleSubmit(login)}>
                  {formFields.map((field, index) => (
                    <Input {...field} control={control} key={index} errors={errors} />
                  ))}
      
                  <IonButton expand="block" type="submit" className="ion-margin-top">
                    Login
                  </IonButton>
                </form>
                <p>New here? <Link to="/register">Register</Link></p>
              </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
  
};

export default Login;