import React from 'react';
import IntegrationList from './components/IntegrationList';
import { loadIntegrations } from '~/lib/server/loaders/load-integrations';

const Integrations = async () => {
  const integrations = await loadIntegrations();

  console.log(integrations);
  return (
    <>
      <IntegrationList integrations={integrations} />
    </>
  );
};

export default Integrations;
