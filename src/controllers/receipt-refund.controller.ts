import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Receipt,
  Refund,
} from '../models';
import {ReceiptRepository} from '../repositories';

export class ReceiptRefundController {
  constructor(
    @repository(ReceiptRepository) protected receiptRepository: ReceiptRepository,
  ) { }

  @get('/receipts/{id}/refunds', {
    responses: {
      '200': {
        description: 'Array of Receipt has many Refund',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Refund)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Refund>,
  ): Promise<Refund[]> {
    return this.receiptRepository.refunds(id).find(filter);
  }

  @authenticate('jwt')
  @post('/receipts/{id}/refunds', {
    responses: {
      '200': {
        description: 'Receipt model instance',
        content: {'application/json': {schema: getModelSchemaRef(Refund)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Receipt.prototype.receiptId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Refund, {
            title: 'NewRefundInReceipt',
            exclude: ['refundId'],
            optional: ['receiptId']
          }),
        },
      },
    }) refund: Omit<Refund, 'refundId'>,
  ): Promise<Refund> {
    return this.receiptRepository.refunds(id).create(refund);
  }

  @patch('/receipts/{id}/refunds', {
    responses: {
      '200': {
        description: 'Receipt.Refund PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Refund, {partial: true}),
        },
      },
    })
    refund: Partial<Refund>,
    @param.query.object('where', getWhereSchemaFor(Refund)) where?: Where<Refund>,
  ): Promise<Count> {
    return this.receiptRepository.refunds(id).patch(refund, where);
  }

  @del('/receipts/{id}/refunds', {
    responses: {
      '200': {
        description: 'Receipt.Refund DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Refund)) where?: Where<Refund>,
  ): Promise<Count> {
    return this.receiptRepository.refunds(id).delete(where);
  }
}
