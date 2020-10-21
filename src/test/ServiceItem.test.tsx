import React from 'react';
import { render, getByText, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ServiceItem from '../components/ServiceItem';

const service = {
  allocated_time: 3,
  id: 1,
  service_type: 'Quick Service',
};

const handleCardClick = () => 'called';

const icon = './static/media/mechanic-icon-3.b81cb595.png';

test('quick service details are displayed', () => {
  const { container } = render(
    <Router>
      <ServiceItem icon={icon} service={service} handleCardClick={handleCardClick} />
    </Router>,
  );

  const learnMore = getByText(container, 'Learn More');
  const serviceType = getByText(container, 'Quick Service');

  fireEvent.click(serviceType);

  expect(learnMore).toBeInTheDocument();
  expect(learnMore).toBeInTheDocument();
});
