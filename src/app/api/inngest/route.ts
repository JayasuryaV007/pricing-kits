import { serve } from 'inngest/next';
import { inngest } from '~/inngest/client';
import allFunctions from '~/inngest/functions';

export const runtime = 'edge';
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: allFunctions,
  streaming: 'allow',
});
