export const generatePrompt = (input: any) => {
  const messages = [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: `You are an expert at reading and extracting details from images. Analyze the given image and extract the following subscription details: 
          - service_name
          - service_url
          - plan_name
          - price (only numbers)
          - billing_cycle (Monthly or Quarterly or Half-yearly or Yearly)
          - paid_date (format: dd-mm-yyyy)
          - start_date (format: dd-mm-yyyy) calculate based on billing cycle and next_billing_date
          - status (Active or InActive or Expired or Cancelled)
          - type (service_type)
          - next_billing_date (format: dd-mm-yyyy)
          Return only the JSON object with the correct details extracted from the image.`,
        },
        {
          type: 'image_url',
          image_url: {
            url: input,
          },
        },
      ],
    },
  ];
  return messages;
};
