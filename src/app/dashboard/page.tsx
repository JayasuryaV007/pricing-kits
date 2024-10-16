import React from 'react';
import DashboardPage from './components/DashboardPage';
import Container from '~/core/ui/Container';

const Dashboard = async () => {
  return (
    <>
      <Container>
        <DashboardPage />
      </Container>
    </>
  );
};

export default Dashboard;
