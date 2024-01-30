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
import {OrderRepository} from '../repositories';

export class OrderWebhookTableController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/webhook-tables', {
    responses: {
      '200': {
        description: 'Array of Order has many WebhookTable',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(WebhookTable)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<WebhookTable>,
  ): Promise<WebhookTable[]> {
    return this.orderRepository.webhookTables(id).find(filter);
  }

  @post('/orders/{id}/webhook-tables', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(WebhookTable)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.orderId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WebhookTable, {
            title: 'NewWebhookTableInOrder',
            exclude: ['webhookId'],
            optional: ['orderId']
          }),
        },
      },
    }) webhookTable: Omit<WebhookTable, 'webhookId'>,
  ): Promise<WebhookTable> {
    return this.orderRepository.webhookTables(id).create(webhookTable);
  }

  @patch('/orders/{id}/webhook-tables', {
    responses: {
      '200': {
        description: 'Order.WebhookTable PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WebhookTable, {partial: true}),
        },
      },
    })
    webhookTable: Partial<WebhookTable>,
    @param.query.object('where', getWhereSchemaFor(WebhookTable)) where?: Where<WebhookTable>,
  ): Promise<Count> {
    return this.orderRepository.webhookTables(id).patch(webhookTable, where);
  }

  @del('/orders/{id}/webhook-tables', {
    responses: {
      '200': {
        description: 'Order.WebhookTable DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(WebhookTable)) where?: Where<WebhookTable>,
  ): Promise<Count> {
    return this.orderRepository.webhookTables(id).delete(where);
  }
}
