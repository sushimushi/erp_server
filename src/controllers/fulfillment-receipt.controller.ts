import {authenticate} from '@loopback/authentication';
import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Fulfillment,
  Receipt,
} from '../models';
import {FulfillmentRepository} from '../repositories';

export class FulfillmentReceiptController {
  constructor(
    @repository(FulfillmentRepository)
    public fulfillmentRepository: FulfillmentRepository,
  ) { }

  @authenticate('jwt')
  @get('/fulfillments/{id}/receipt', {
    responses: {
      '200': {
        description: 'Receipt belonging to Fulfillment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Receipt),
          },
        },
      },
    },
  })
  async getReceipt(
    @param.path.string('id') id: typeof Fulfillment.prototype.fulfillmentId,
  ): Promise<Receipt> {
    return this.fulfillmentRepository.receipt(id);
  }
}
