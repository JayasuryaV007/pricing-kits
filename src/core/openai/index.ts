import OpenAI from 'openai';
import configuration from '~/configuration';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createChatCompletions = async (prompt: any) => {
  try {
    const response = await openai.chat.completions.create({
      model: configuration.openai.model,
      messages: prompt,
    });

    const data = response.choices[0].message.content;
    console.log('Generated Response:', data);
    return data;
  } catch (error: any) {
    console.error('Error generating Response:', error);
    throw new Error('Failed to generate Response: ' + error.message);
  }
};
