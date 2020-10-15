import React from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Upcoming Appointments <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">Appointment 1</a></p>
    </div>
  );
};

export default ExploreContainer;
