/* eslint-disable react/prop-types */
import React, { FC } from 'react';
import {
  IonItem, IonLabel, IonInput, IonText,
} from '@ionic/react';
import {
  Controller,
} from 'react-hook-form';

export interface InputProps {
  name: any;
  control?: any;
  label?: string;
  component?: any;
  errors?: any;
}

const Input: FC<InputProps> = ({
  name, control, component, label, errors,
}) => (
  <>
    <IonItem>
      {label && <IonLabel position="floating">{label}</IonLabel>}
      <Controller
        as={
          component ?? (
            <IonInput
              aria-invalid={errors && errors[name] ? 'true' : 'false'}
              aria-describedby={`${name}Error`}
            />
          )
        }
        name={name}
        control={control}
        onChangeName="onIonChange"
      />
    </IonItem>
    {errors && errors[name] && (
      <IonText color="danger" className="ion-padding-start">
        <small>
          <span role="alert" id={`${name}Error`}>
            {errors[name].message}
          </span>
        </small>
      </IonText>
    )}
  </>
);

export default Input;
