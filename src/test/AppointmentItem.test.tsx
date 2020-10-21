import React from 'react';
import { render, getByText } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppointmentItem from '../components/AppointmentItem';

const appoint = {
  allocated_time: 3,
  description: 'quick service test',
  end_time: '2020-10-20T11:00:00.000Z',
  id: 1,
  service_id: 1,
  service_type: 'Quick Service',
  start_time: '2020-10-20T08:00:00.000Z',
  user_id: 1,
};

test('appointment is displayed', () => {
  const { container } = render(
    <Router>
      <AppointmentItem appoint={appoint} />
    </Router>,
  );

  const description = getByText(container, 'quick service test');
  const serviceType = getByText(container, 'Quick Service');
  const allocatedTime = getByText(container, '3 hours');

  expect(description).toBeInTheDocument();
  expect(serviceType).toBeInTheDocument();
  expect(allocatedTime).toBeInTheDocument();
});
