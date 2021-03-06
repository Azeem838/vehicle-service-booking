import {
  IonPage,
  IonButton,
  IonInput,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonItem,
  IonLabel,
  IonCheckbox,
} from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Input, { InputProps } from '../components/Input';
import toast from '../components/toast';
import { registerUser } from '../api/apiConfig';
import { setUser } from '../actions';

const Register: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { control, handleSubmit, errors } = useForm();

  const formFields: InputProps[] = [
    {
      name: 'username',
      component: <IonInput type="text" required />,
      label: 'Username',
    },
    {
      name: 'email',
      component: <IonInput type="email" required />,
      label: 'Email',
    },
    {
      name: 'password',
      component: <IonInput type="password" clearOnEdit={false} required />,
      label: 'Password',
    },
    {
      name: 'cpassword',
      component: <IonInput type="password" clearOnEdit={false} required />,
      label: 'Confirm Password',
    },
  ];

  const register = (data: any) => {
    setBusy(true);

    try {
      if (data.password !== data.cpassword) {
        toast('Passwords do not match');
        return setBusy(false);
      }
      if (data.username.trim() === '' || data.password.trim() === '') {
        toast('Username and Password are required');
        return setBusy(false);
      }
    } catch (error) {
      toast("Required fields can't be blank");
      return setBusy(false);
    }

    return registerUser(data.username, data.email, data.password).then(user => {
      setBusy(false);
      if (user.error) {
        toast(user.error, 4000);
      } else {
        toast('Registration successful');
        dispatch(setUser(user));
        history.push('/vehicle-service-booking/services');
      }
    });
  };

  return (
    <IonPage style={{ backgroundColor: '#fcb402' }}>
      <IonGrid>
        <IonRow className="ion-align-items-center" style={{ height: '100%' }}>
          <IonCol>
            <div className="ion-padding">
              <IonText color="muted">
                <h2>Create Account</h2>
              </IonText>
              <IonLoading message="Please wait..." duration={0} isOpen={busy} />

              <form onSubmit={handleSubmit(register)}>
                {formFields.map(field => (
                  <Input
                    {...field}
                    control={control}
                    key={Math.random()}
                    errors={errors}
                  />
                ))}

                <IonItem>
                  <IonLabel>I agree to the terms of service</IonLabel>
                  <IonCheckbox slot="start" />
                </IonItem>
                <IonButton
                  expand="block"
                  type="submit"
                  className="ion-margin-top"
                >
                  Register
                </IonButton>
              </form>
              <p>
                Already have an account?
                {' '}
                <Link style={{ color: 'white' }} to="/login">
                  Login
                </Link>
              </p>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default Register;
