import {BindingScope, config, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import moment from 'moment';
import {CaptchaInstance} from '../models';
import {CaptchaInstanceRepository} from '../repositories';
import {
  CanvasCaptchaImageService,
  CaptchaDifficulty,
  CaptchaImageService,
} from './captcha-image.service';

// Removed uppercase I, lowercase L and letter o as they are ambiguous
const charSet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz0123456789';

export enum CaptchaVerifiedResult {
  SUCCESS,
  INVALID,
  NOT_EXISTING,
  EXPIRED,
  ALREADY_VERIFIED,
}

export interface CaptchaManagerOptions {
  /** Number of characters in the captcha */
  textLength: number;
  /** Time after which the captcha will be considered expired */
  expiredTime: number;
}

const defaultOptions: CaptchaManagerOptions = {
  textLength: 6,
  expiredTime: 15,
};

@injectable({scope: BindingScope.SINGLETON})
export class CaptchaManagerService {
  constructor(
    @service(CanvasCaptchaImageService)
    private captchaImageService: CaptchaImageService,
    @repository(CaptchaInstanceRepository)
    private captchaInstanceRepository: CaptchaInstanceRepository,
    @config()
    private options: CaptchaManagerOptions = defaultOptions,
  ) {}

  private getRandomText(length = 5): string {
    let text = '';

    const setLen = charSet.length;
    for (let i = 0; i < length; i++) {
      const rnd = Math.floor(Math.random() * setLen);
      text += charSet[rnd];
    }

    return text;
  }

  async generate(difficulty: CaptchaDifficulty): Promise<CaptchaInstance> {
    const captchaText = this.getRandomText(this.options.textLength);
    const captchaImageUrl = this.captchaImageService.createImage(
      captchaText,
      difficulty,
    );

    const instance = await this.captchaInstanceRepository.create({
      value: captchaText,
      imageUrl: captchaImageUrl,
    });

    return instance;
  }

  async verify(id: string, text: string): Promise<CaptchaVerifiedResult> {
    try {
      const captcha = await this.captchaInstanceRepository.findById(id);

      // Checking if captcha is expired
      const minutesFromGeneration = moment().diff(
        moment(captcha.generatedAt),
        'minutes',
      );

      if (minutesFromGeneration > this.options.expiredTime) {
        return CaptchaVerifiedResult.EXPIRED;
      }

      if (captcha.solved) {
        return CaptchaVerifiedResult.ALREADY_VERIFIED;
      }

      if (
        captcha.value.toLocaleLowerCase() === text.trim().toLocaleLowerCase()
      ) {
        captcha.solved = true;
        captcha.solvedAt = new Date(); // now
        await this.captchaInstanceRepository.save(captcha);
        return CaptchaVerifiedResult.SUCCESS;
      }

      return CaptchaVerifiedResult.INVALID;
    } catch (e) {
      if (e.code === 'ENTITY_NOT_FOUND') {
        return CaptchaVerifiedResult.NOT_EXISTING;
      } else {
        return CaptchaVerifiedResult.INVALID;
      }
    }
  }
}
