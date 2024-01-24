import {Model, model, property} from '@loopback/repository';

@model()
export class Printer extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  printerId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  size: string;

  @property({
    type: 'object',
  })
  configId: object;

  constructor(data?: Partial<Printer>) {
    super(data);
  }
}

export interface PrinterRelations {
  // describe navigational properties here
}

export type PrinterWithRelations = Printer & PrinterRelations;
