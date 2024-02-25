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
  Channel,
  Order,
} from '../models';
import {ChannelRepository} from '../repositories';

export class ChannelOrderController {
  constructor(
    @repository(ChannelRepository) protected channelRepository: ChannelRepository,
  ) { }

  @authenticate('jwt')
  @get('/channels/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Channel has many Order',
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
    return this.channelRepository.orders(id).find(filter);
  }

  @authenticate('jwt')
  @post('/channels/{id}/orders', {
    responses: {
      '200': {
        description: 'Channel model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Channel.prototype.channelId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInChannel',
            exclude: ['orderId'],
            optional: ['channelId']
          }),
        },
      },
    }) order: Omit<Order, 'orderId'>,
  ): Promise<Order> {
    return this.channelRepository.orders(id).create(order);
  }

  @authenticate('jwt')
  @patch('/channels/{id}/orders', {
    responses: {
      '200': {
        description: 'Channel.Order PATCH success count',
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
    return this.channelRepository.orders(id).patch(order, where);
  }

  @authenticate('jwt')
  @del('/channels/{id}/orders', {
    responses: {
      '200': {
        description: 'Channel.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.channelRepository.orders(id).delete(where);
  }
}
