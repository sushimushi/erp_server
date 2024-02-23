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
  Order,
  WebhookTable,
} from '../models';
import {WebhookTableRepository} from '../repositories';

export class WebhookTableOrderController {
  constructor(
    @repository(WebhookTableRepository) protected webhookTableRepository: WebhookTableRepository,
  ) { }

  @get('/webhook-tables/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of WebhookTable has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.webhookTableRepository.orders(id).find(filter);
  }

  @authenticate('jwt')
  @post('/webhook-tables/{id}/orders', {
    responses: {
      '200': {
        description: 'WebhookTable model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof WebhookTable.prototype.webhookId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInWebhookTable',
            exclude: ['orderId'],
            optional: ['orderId']
          }),
        },
      },
    }) order: Omit<Order, 'orderId'>,
  ): Promise<Order> {
    return this.webhookTableRepository.orders(id).create(order);
  }

  @patch('/webhook-tables/{id}/orders', {
    responses: {
      '200': {
        description: 'WebhookTable.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.webhookTableRepository.orders(id).patch(order, where);
  }

  @del('/webhook-tables/{id}/orders', {
    responses: {
      '200': {
        description: 'WebhookTable.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.webhookTableRepository.orders(id).delete(where);
  }
}
