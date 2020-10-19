
import {
  IonContent,
  IonPage,
  IonText,
  IonInput,
  IonButton,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetime,
} from "@ionic/react";
import React from "react";
import { useForm } from "react-hook-form";
import Input, { InputProps } from "../components/Input";
import { date, object, string } from "yup";
import { RootStateOrAny, useSelector } from "react-redux";
import moment from 'moment';
import { request } from '../api/apiConfig';
import { toast } from "../components/toast";
import { useHistory } from "react-router";

const ServiceForm: React.FC = () => {

  const services = useSelector((state: RootStateOrAny) => state.services)
  const user = useSelector((state: RootStateOrAny) => state.userData)
  const history = useHistory()

  const validationSchema = object().shape({
    description: string(),
    serviceType: string().required('Please select the type of service'),
    startDate: date().required('Please provide a drop-off date').min(new Date()),
    startTime: string().required('Please provide a drop-off time'),
  });
  const { control, handleSubmit, errors, reset } = useForm({
    validationSchema,
  });

  const today = moment();
  let tomorrow = moment(today).add(1, 'days').hours(8).minutes(0).format()
  
  const nextYear = moment(today).add(1, 'years').hours(12).minutes(0).format();

  const formFields: InputProps[] = [
    {
      name: "serviceType",
      label: "Select a service",
      component: <IonSelect>
        {services.map((service: any) => {
          return (<IonSelectOption key={service.id} value={service.service_type}>{service.service_type}</IonSelectOption>)
        })}
      </IonSelect>
    },
    {
      name: "description",
      component: <IonInput type="text" />,
      label: "Describe the problem",
    },
    {
      name: "startDate",
      component: <IonDatetime min={`${tomorrow}`} max={`${nextYear}`} placeholder="Select Date" />,
      label: "Drop-off date",
    },
    {
      name: "startTime",
      component: <IonDatetime min="08:00" max="11:59" minuteValues="0,15,30,45" display-format="hh:mm" picker-format="hh:mm" placeholder="Select Time" />,
      label: "Drop-off time",
    },
  ];

  const newAppointment = (data: any) => {
    const startD = moment(data.startDate).format('DD MM YYYY')
    const startT = moment(data.startTime).format('HH mm')
    const start_time = moment(startD + " " + startT, 'DD MM YYYY HH mm').toString()
    
    const service_time = services.find((o: any) => o.service_type === data.serviceType).allocated_time
    const end_time = moment(start_time).add(service_time, 'hours').toISOString()

    const service_id = services.find((o: any) => o.service_type === data.serviceType).id
    
    const description = data.description
    reset()

    request(user.token, 'appointments', 'POST', {
        "service_id": `${service_id}`,
        "start_time": `${start_time}`,
        "end_time": `${end_time}`,
        "description": `${description}`,
    }).then(res => {
      toast(res.message, 3000)
      history.push('/appointments')
    })

  };

  return (
    <IonPage>
      <IonContent>
        <div className="ion-padding">
          <IonText color="muted">
            <h2>New Service Appointment</h2>
          </IonText>

          <form onSubmit={handleSubmit(newAppointment)}>
            {formFields.map((field, index) => (
              <Input {...field} control={control} key={index} errors={errors} />
            ))}

            <IonItem>
              <IonLabel>I agree to the terms of service</IonLabel>
              <IonCheckbox aria-required={true} slot="start" />
            </IonItem>
            <IonButton expand="block" type="submit" className="ion-margin-top">
              Create Booking
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ServiceForm;