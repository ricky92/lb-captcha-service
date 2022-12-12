import {Model, model, property} from '@loopback/repository';

@model()
export class CaptchaVerifyRequest extends Model {
  @property({
    jsonSchema: {
      description: "The text displayed in the CAPTCHA image"
    }
  })
  value: string;

  constructor(data?: Partial<CaptchaVerifyRequest>) {
    super(data);
  }
}
