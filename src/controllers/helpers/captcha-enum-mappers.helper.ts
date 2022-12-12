import {CaptchaDifficulty, CaptchaVerifiedResult} from '../../services';
import {CaptchaDifficultyRequest} from '../requests/new-captcha.model';
import {CaptchaVerifiedResponseResult} from '../responses/captcha-verified.model';

export const difficultyMap: {
  [key in keyof CaptchaDifficultyRequest as string]: CaptchaDifficulty;
} = {
  [CaptchaDifficultyRequest.EASY]: CaptchaDifficulty.EASY,
  [CaptchaDifficultyRequest.MEDIUM]: CaptchaDifficulty.MEDIUM,
  [CaptchaDifficultyRequest.HARD]: CaptchaDifficulty.HARD,
};

export const resultsCodeMap: {
  [key in keyof CaptchaVerifiedResult as string]: CaptchaVerifiedResponseResult;
} = {
  [CaptchaVerifiedResult.SUCCESS]: CaptchaVerifiedResponseResult.SUCCESS,
  [CaptchaVerifiedResult.INVALID]: CaptchaVerifiedResponseResult.INVALID,
  [CaptchaVerifiedResult.EXPIRED]: CaptchaVerifiedResponseResult.EXPIRED,
  [CaptchaVerifiedResult.NOT_EXISTING]:
    CaptchaVerifiedResponseResult.NOT_EXISTING,
  [CaptchaVerifiedResult.ALREADY_VERIFIED]:
    CaptchaVerifiedResponseResult.ALREADY_VERIFIED,
};
