import {Model, model, property} from '@loopback/repository';

export enum CaptchaVerifiedResponseResult {
  SUCCESS = 'success',
  INVALID = 'invalid',
  NOT_EXISTING = 'not_exists',
  EXPIRED = 'expired',
  ALREADY_VERIFIED = 'already_verified',
  UNKNOWN_ERROR = 'unknown_error',
}

@model()
export class CaptchaVerifiedResponse extends Model {
  @property({
    type: 'string',
    jsonSchema: {
      description: "Result of the CAPTCHA validation. Only 'success' signals " +
        "that the CAPTCHA has been solved correctly, other codes are for debug purposes",
      enum: [
        CaptchaVerifiedResponseResult.SUCCESS,
        CaptchaVerifiedResponseResult.INVALID,
        CaptchaVerifiedResponseResult.NOT_EXISTING,
        CaptchaVerifiedResponseResult.EXPIRED,
        CaptchaVerifiedResponseResult.ALREADY_VERIFIED,
        CaptchaVerifiedResponseResult.UNKNOWN_ERROR
      ],
    },
  })
  result: CaptchaVerifiedResponseResult;

  constructor(data?: Partial<CaptchaVerifiedResponse>) {
    super(data);
  }
}
