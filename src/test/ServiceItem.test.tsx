import React from 'react'
import { render, getByText, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ServiceItem from '../components/ServiceItem';
import { act } from 'react-dom/test-utils';

const service = {
  allocated_time: 3,
  id: 1,
  service_type: "Quick Service",
}

const handleCardClick = () => 'called';

const active = 'all'

test('quick service details are displayed', () => {
  const { container } = render(
    <Router>
      <ServiceItem service={service} handleCardClick={handleCardClick} />  
    </Router>
  );

  const learnMore = getByText(container, 'Learn More');
  const serviceType = getByText(container, 'Quick Service');

  fireEvent.click(serviceType);

  expect(learnMore).toBeInTheDocument();
  expect(learnMore).toBeInTheDocument();
})