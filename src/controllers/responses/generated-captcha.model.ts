import {model, Model, property} from '@loopback/repository';

@model()
export class GeneratedCaptchaResponse extends Model {
  @property({
    jsonSchema: {
      description: "The ID of the newly generated CAPTCHA. Must be used in subsequent request to verify it."
    }
  })
  captchaId: string;

  @property({
    jsonSchema: {
      description: "URL to the generated image. Could potentially be a base64-encoded image-data URL."
    }
  })
  imageUrl: string;

  constructor(data?: Partial<GeneratedCaptchaResponse>) {
    super(data);
  }
}
