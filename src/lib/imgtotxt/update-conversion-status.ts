import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import { Database } from '~/database.types';

export const updateCurrentStep = async (id: string, currentStep: string) => {
  const client = getSupabaseServerComponentClient();

  const [{ error }] = await Promise.all([
    client
      .from('image_details')
      .update({
        status: 'progress',
        conversion_current_step: currentStep,
      })
      .eq('id', id),
  ]);

  if (error) throw error;
};

export const onArticleGenerationFailed = async ({
  what,
  error,
  data,
}: {
  what: string;
  error: Error;
  data: Database['public']['Tables']['image_details']['Row'];
}) => {
  console.log(what, error);

  const client = getSupabaseServerComponentClient();

  const { data: svg } = await client
    .from('image_details')
    .select('id, status')
    .eq('id', data.id)
    .single();

  await Promise.all([
    svg?.status !== 'complete'
      ? client
          .from('image_details')
          .update({
            status: 'failed',
            status_extra: {
              errorMessage: error.message,
            },
          })
          .eq('id', data.id)
      : Promise.resolve(),
  ]);
};
