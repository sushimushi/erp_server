import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Receipt,
  Fulfillment,
} from '../models';
import {ReceiptRepository} from '../repositories';

export class ReceiptFulfillmentController {
  constructor(
    @repository(ReceiptRepository)
    public receiptRepository: ReceiptRepository,
  ) { }

  @get('/receipts/{id}/fulfillment', {
    responses: {
      '200': {
        description: 'Fulfillment belonging to Receipt',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Fulfillment),
          },
        },
      },
    },
  })
  async getFulfillment(
    @param.path.string('id') id: typeof Receipt.prototype.receiptId,
  ): Promise<Fulfillment> {
    return this.receiptRepository.fulfillment(id);
  }
}
