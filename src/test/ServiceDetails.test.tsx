import React from 'react';
import { render, getByText, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ServiceDetails from '../components/ServiceDetails';

const serviceDetails = {
  allocated_time: 3,
  id: 1,
  service_type: 'Quick Service',
};

const active = 'all';

const icon = './static/media/mechanic-icon-3.b81cb595.png';

test('quick service details are displayed', () => {
  const { container } = render(
    <Router>
      <ServiceDetails icon={icon} service={serviceDetails} active={active} />
    </Router>,
  );

  const allocatedTime = getByText(container, 'Typically: 3 hours');
  const serviceType = getByText(container, 'What is a Quick Service?');

  fireEvent.click(serviceType);

  expect(allocatedTime).toBeInTheDocument();
  expect(serviceType).toBeInTheDocument();
});
