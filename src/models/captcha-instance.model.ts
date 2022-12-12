import {Entity, model, property} from '@loopback/repository';

@model()
export class CaptchaInstance extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  @property({
    type: 'string',
    mysql: {
      // Not optimal, but it's quick to store either base64-encoded images or regular URLs
      // should one decide to move to a different storage method (e.g. S3 or cloud storage)
      dataType: 'LONGTEXT',
    },
  })
  imageUrl: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  generatedAt?: Date;

  @property({
    type: 'boolean',
    default: false,
  })
  solved?: boolean;

  @property({
    type: 'date',
    required: false,
  })
  solvedAt?: Date;

  constructor(data?: Partial<CaptchaInstance>) {
    super(data);
  }
}

export interface CaptchaInstanceRelations {
  // describe navigational properties here
}

export type CaptchaInstanceWithRelations = CaptchaInstance &
  CaptchaInstanceRelations;
