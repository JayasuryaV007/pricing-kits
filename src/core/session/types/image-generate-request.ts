type ImageGenerateRequest = {
  description: string;
  style: string;
  colorScheme: string;
  dimension: string;
  size: string;
  resolution: string;
  additional_elements: string;
  usage_context: string;
  no_of_elements: string;
  csrfToken?: string | null;
  previousId?: string | null;
};

export default ImageGenerateRequest;
