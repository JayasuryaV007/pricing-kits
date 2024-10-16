import { EventSchemas, Inngest } from 'inngest';
import { Database } from '~/database.types';

type Events = {
  'convert-image-to-text': {
    data: Database['public']['Tables']['image_details']['Row'];
  };
};

export const inngest = new Inngest({
  id: 'every-penny-app',
  name: 'Every Penny App',
  schemas: new EventSchemas().fromRecord<Events>(),
});
