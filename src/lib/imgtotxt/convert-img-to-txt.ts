import { createChatCompletions } from '~/core/openai';
import { generatePrompt } from '../prompts';

export async function convertImagetoText(data: any) {
  const prompt = generatePrompt(data);
  const response = await createChatCompletions(prompt);
  const promptTokens = prompt.reduce(
    (acc, message) => acc + (message.content ? message.content.length : 0),
    0,
  );

  const regex = /\{[\s\S]*\}/;
  const result = response?.match(regex);

  if (result) {
    console.log(result[0]);
    return { content: result[0], promptTokens };
  } else {
    throw new Error('No JSON found');
  }
}

export async function updateDatabase(
  client: any,
  id: string,
  promptTokens: number,
) {
  const { data: response, error } = await client
    .from('image_details')
    .update({ prompt_size: promptTokens })
    .eq('id', id);

  if (error) {
    console.log('request data update error', error);
  }
}

export async function storeUserSubscriptions(
  client: any,
  subscriptionData: any,
  user_id: string,
) {
  let insertData = {
    user_id: user_id,
    ...subscriptionData,
  };
  const { data: response, error } = await client
    .from('user_subscriptions')
    .upsert(insertData)
    .select();

  if (error) {
    console.log(' data insert error', error);
  }
}
