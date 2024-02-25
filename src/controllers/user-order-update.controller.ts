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
  OrderUpdate,
  User,
} from '../models';
import {UserRepository} from '../repositories';

export class UserOrderUpdateController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/order-updates', {
    responses: {
      '200': {
        description: 'Array of User has many OrderUpdate',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderUpdate)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OrderUpdate>,
  ): Promise<OrderUpdate[]> {
    return this.userRepository.orderUpdates(id).find(filter);
  }

  @authenticate('jwt')
  @post('/users/{id}/order-updates', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderUpdate)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.userId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderUpdate, {
            title: 'NewOrderUpdateInUser',
            exclude: ['updateReferenceId'],
            optional: ['updatedBy']
          }),
        },
      },
    }) orderUpdate: Omit<OrderUpdate, 'updateReferenceId'>,
  ): Promise<OrderUpdate> {
    return this.userRepository.orderUpdates(id).create(orderUpdate);
  }

  @patch('/users/{id}/order-updates', {
    responses: {
      '200': {
        description: 'User.OrderUpdate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderUpdate, {partial: true}),
        },
      },
    })
    orderUpdate: Partial<OrderUpdate>,
    @param.query.object('where', getWhereSchemaFor(OrderUpdate)) where?: Where<OrderUpdate>,
  ): Promise<Count> {
    return this.userRepository.orderUpdates(id).patch(orderUpdate, where);
  }

  @del('/users/{id}/order-updates', {
    responses: {
      '200': {
        description: 'User.OrderUpdate DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrderUpdate)) where?: Where<OrderUpdate>,
  ): Promise<Count> {
    return this.userRepository.orderUpdates(id).delete(where);
  }
}
