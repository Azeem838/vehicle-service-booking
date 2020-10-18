import React, { FC } from "react";
import { IonItem, IonLabel, IonInput, IonText } from "@ionic/react";
import {
  Controller,
  Control,
  NestDataObject,
  FieldError,
} from "react-hook-form";

export interface InputProps {
  name: string;
  control?: Control;
  label?: string;
  component?: JSX.Element;
  errors?: NestDataObject<Record<string, any>, FieldError>;
}

const Input: FC<InputProps> = ({ name, control, component, label, errors }) => {
  return (
    <>
      <IonItem>
        {label && <IonLabel position="floating">{label}</IonLabel>}
        <Controller
          as={
            component ?? (
              <IonInput
                aria-invalid={errors && errors[name] ? "true" : "false"}
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
};

export default Input;