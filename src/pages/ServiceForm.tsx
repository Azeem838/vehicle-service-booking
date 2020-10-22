import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from '@ionic/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { date, object, string } from 'yup';
import { RootStateOrAny, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router';
import { request } from '../api/apiConfig';
import toast from '../components/toast';
import Input, { InputProps } from '../components/Input';

const ServiceForm: React.FC = () => {
  const services = useSelector((state: RootStateOrAny) => state.services);
  const user = useSelector((state: RootStateOrAny) => state.userData);
  const history = useHistory();

  const validationSchema = object().shape({
    description: string(),
    serviceType: string().required('Please select the type of service'),
    startDate: date()
      .required('Please provide a drop-off date')
      .min(new Date()),
    startTime: string().required('Please provide a drop-off time'),
  });
  const {
    control, handleSubmit, errors, reset,
  } = useForm({
    validationSchema,
  });

  const today = moment();
  const tomorrow = moment(today).add(1, 'days').hours(8).minutes(0)
    .format();

  const nextYear = moment(today).add(1, 'years').hours(12).minutes(0)
    .format();

  const formFields: InputProps[] = [
    {
      name: 'serviceType',
      label: 'Select a service',
      component: (
        <IonSelect>
          {services.map((service: any) => (
            <IonSelectOption key={service.id} value={service.service_type}>
              {service.service_type}
            </IonSelectOption>
          ))}
        </IonSelect>
      ),
    },
    {
      name: 'description',
      component: <IonInput type="text" />,
      label: 'Describe the problem',
    },
    {
      name: 'startDate',
      component: (
        <IonDatetime
          min={`${tomorrow}`}
          max={`${nextYear}`}
          placeholder="Select Date"
        />
      ),
      label: 'Drop-off date',
    },
    {
      name: 'startTime',
      component: (
        <IonDatetime
          min="08:00"
          max="11:59"
          minuteValues="0,15,30,45"
          display-format="hh:mm"
          picker-format="hh:mm"
          placeholder="Select Time"
        />
      ),
      label: 'Drop-off time',
    },
  ];

  const newAppointment = (data: any) => {
    const startD = moment(data.startDate).format('DD MM YYYY');
    const startT = moment(data.startTime).format('HH mm');
    const start_time = moment(
      `${startD} ${startT}`,
      'DD MM YYYY HH mm',
    ).toString();

    const service_time = services.find(
      (o: any) => o.service_type === data.serviceType,
    ).allocated_time;
    const end_time = moment(start_time)
      .add(service_time, 'hours')
      .toISOString();

    const service_id = services.find(
      (o: any) => o.service_type === data.serviceType,
    ).id;

    const { description } = data;
    reset();

    request(user.token, 'appointments', 'POST', {
      service_id: `${service_id}`,
      start_time: `${start_time}`,
      end_time: `${end_time}`,
      description: `${description}`,
    }).then(res => {
      toast(res.message, 3000);
      history.push('/vehicle-service-booking/appointments');
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>New Service Appointment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <form onSubmit={handleSubmit(newAppointment)}>
            {formFields.map(field => (
              <Input {...field} control={control} key={Math.random()} errors={errors} />
            ))}

            <IonItem>
              <IonLabel>I agree to the terms of service</IonLabel>
              <IonCheckbox aria-required slot="start" />
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
