import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {CaptchaInstanceRepository} from '../repositories';
import {CaptchaDifficulty} from '../services';
import {
  CaptchaManagerService
} from '../services/captcha-manager.service';
import {difficultyMap, resultsCodeMap} from './helpers/captcha-enum-mappers.helper';
import {CaptchaVerifyRequest} from './requests/captcha-verify.model';
import {
  NewCaptchaRequest
} from './requests/new-captcha.model';
import {
  CaptchaVerifiedResponse,
  CaptchaVerifiedResponseResult
} from './responses/captcha-verified.model';
import {GeneratedCaptchaResponse} from './responses/generated-captcha.model';

export class CaptchaController {
  constructor(
    @repository(CaptchaInstanceRepository)
    private captchaInstanceRepository: CaptchaInstanceRepository,
    @service(CaptchaManagerService)
    private captchaManagerService: CaptchaManagerService,
  ) {}

  @post('/captcha/generate')
  @response(200, {
    description: 'Generate a new captcha instance',
    content: {'application/json': {schema: getModelSchemaRef(GeneratedCaptchaResponse)}},
  })
  async create(
    @requestBody()
    captchaRequest: NewCaptchaRequest,
  ): Promise<GeneratedCaptchaResponse> {
    const difficulty = captchaRequest.difficulty
      ? difficultyMap[captchaRequest.difficulty]
      : CaptchaDifficulty.EASY;
    const instance = await this.captchaManagerService.generate(difficulty);

    return new GeneratedCaptchaResponse({
      captchaId: instance.id,
      imageUrl: instance.imageUrl,
    });
  }

  @post('/captcha/{id}/verify')
  @response(200, {
    description: 'Verify the captcha against your provided value',
    content: {'application/json': {schema: getModelSchemaRef(CaptchaVerifiedResponse)}},
  })
  async verify(
    @param.path.string('id')
    id: string,
    @requestBody()
    captchaRequest: CaptchaVerifyRequest,
  ): Promise<CaptchaVerifiedResponse> {
    const verifiedValue = await this.captchaManagerService.verify(
      id,
      captchaRequest.value,
    );

    const mappedValue =
      resultsCodeMap[verifiedValue] ??
      CaptchaVerifiedResponseResult.UNKNOWN_ERROR;

    return new CaptchaVerifiedResponse({
      result: mappedValue,
    });
  }
}
