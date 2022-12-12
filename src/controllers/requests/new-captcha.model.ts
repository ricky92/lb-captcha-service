import {model, Model, property} from '@loopback/repository';

export enum CaptchaDifficultyRequest {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

@model()
export class NewCaptchaRequest extends Model {
  @property({
    type: 'string',
    jsonSchema: {
      description: "Determines how difficult to solve the CAPTCHA will be",
      enum: [
        CaptchaDifficultyRequest.EASY,
        CaptchaDifficultyRequest.MEDIUM,
        CaptchaDifficultyRequest.HARD,
      ],
    },
  })
  difficulty?: CaptchaDifficultyRequest;

  constructor(data: Partial<NewCaptchaRequest>) {
    super(data);
  }
}
