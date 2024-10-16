import { inngest } from '../client';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import {
  onArticleGenerationFailed,
  updateCurrentStep,
} from '~/lib/imgtotxt/update-conversion-status';
import {
  convertImagetoText,
  storeUserSubscriptions,
  updateDatabase,
} from '~/lib/imgtotxt/convert-img-to-txt';
import getImageUrl from '~/lib/server/loaders/utils/get-image-url';

export const convertImageToTextRequest = inngest.createFunction(
  {
    id: 'convertImgtoTxt',
    name: 'ConvertImgtoTxt',
    retries: 2,
    onFailure: async ({ error, event }) => {
      const data = event.data.event.data;
      await onArticleGenerationFailed({
        what: 'convert image to text function crashed',
        error,
        data,
      });
    },
  },
  { event: 'convert-image-to-text' },
  async ({ event, step }) => {
    const data = event.data;
    const client = getSupabaseServerComponentClient();
    console.log('wefbrkhbgrtg', data);
    let subscriptionData: any;

    await step.run('Converting Image to Text', async () => {
      try {
        await updateCurrentStep(data.id, 'Converting image to text');
        const imageUrl = await getImageUrl(data.image_name);
        const { content, promptTokens } = await convertImagetoText(imageUrl);

        console.log('content: ', content);
        subscriptionData = JSON.parse(content);
        await updateDatabase(client, data.id, promptTokens);
        await storeUserSubscriptions(client, subscriptionData, data.user_id);
      } catch (error) {
        throw error;
      }
    });

    await updateCurrentStep(data.id, 'Finishing Up');
    await client
      .from('image_details')
      .update({ status: 'complete' })
      .eq('id', data.id);

    return { event, message: 'Conversion of Image to Text complete' };
  },
);
