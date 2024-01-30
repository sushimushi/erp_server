import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Refund,
  Order,
} from '../models';
import {RefundRepository} from '../repositories';

export class RefundOrderController {
  constructor(
    @repository(RefundRepository)
    public refundRepository: RefundRepository,
  ) { }

  @get('/refunds/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to Refund',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Order),
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.string('id') id: typeof Refund.prototype.refundId,
  ): Promise<Order> {
    return this.refundRepository.order(id);
  }
}
