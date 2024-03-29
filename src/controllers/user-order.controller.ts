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
  User,
} from '../models';
import {UserRepository} from '../repositories';

export class UserOrderController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of User has many Order',
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
    return this.userRepository.cancelledBy(id).find(filter);
  }

  @authenticate('jwt')
  @post('/users/{id}/orders', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.userId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInUser',
            exclude: ['orderId'],
            optional: ['cancelledBy']
          }),
        },
      },
    }) order: Omit<Order, 'orderId'>,
  ): Promise<Order> {
    return this.userRepository.cancelledBy(id).create(order);
  }

  @patch('/users/{id}/orders', {
    responses: {
      '200': {
        description: 'User.Order PATCH success count',
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
    return this.userRepository.cancelledBy(id).patch(order, where);
  }

  @del('/users/{id}/orders', {
    responses: {
      '200': {
        description: 'User.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.userRepository.cancelledBy(id).delete(where);
  }
}
