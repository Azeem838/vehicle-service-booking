import React from 'react'
import { render, getByText, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ServiceDetails from '../components/ServiceDetails';
import { act } from 'react-dom/test-utils';

const serviceDetails = {
  allocated_time: 3,
  id: 1,
  service_type: "Quick Service"
}

const active = 'all'

test('quick service details are displayed', () => {
  const { container } = render(
    <Router>
      <ServiceDetails service={serviceDetails} active={active} />  
    </Router>
  );

  const allocatedTime = getByText(container, 'Typically: 3 hours');
  const serviceType = getByText(container, 'What is a Quick Service?');

  fireEvent.click(serviceType);

  expect(allocatedTime).toBeInTheDocument();
  expect(serviceType).toBeInTheDocument();
})