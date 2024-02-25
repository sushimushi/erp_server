import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {OrderUpdate} from '../models';
import {OrderUpdateRepository} from '../repositories';

export class OrderUpdateController {
  constructor(
    @repository(OrderUpdateRepository)
    public orderUpdateRepository : OrderUpdateRepository,
  ) {}

  @authenticate('jwt')
  @post('/order-updates')
  @response(200, {
    description: 'OrderUpdate model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderUpdate)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderUpdate, {
            title: 'NewOrderUpdate',
            exclude: ['updateReferenceId'],
          }),
        },
      },
    })
    orderUpdate: Omit<OrderUpdate, 'updateReferenceId'>,
  ): Promise<OrderUpdate> {
    return this.orderUpdateRepository.create(orderUpdate);
  }

  @authenticate('jwt')
  @get('/order-updates/count')
  @response(200, {
    description: 'OrderUpdate model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderUpdate) where?: Where<OrderUpdate>,
  ): Promise<Count> {
    return this.orderUpdateRepository.count(where);
  }

  @authenticate('jwt')
  @get('/order-updates')
  @response(200, {
    description: 'Array of OrderUpdate model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderUpdate, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderUpdate) filter?: Filter<OrderUpdate>,
  ): Promise<OrderUpdate[]> {
    return this.orderUpdateRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/order-updates')
  @response(200, {
    description: 'OrderUpdate PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderUpdate, {partial: true}),
        },
      },
    })
    orderUpdate: OrderUpdate,
    @param.where(OrderUpdate) where?: Where<OrderUpdate>,
  ): Promise<Count> {
    return this.orderUpdateRepository.updateAll(orderUpdate, where);
  }

  @authenticate('jwt')
  @get('/order-updates/{id}')
  @response(200, {
    description: 'OrderUpdate model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderUpdate, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrderUpdate, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderUpdate>
  ): Promise<OrderUpdate> {
    return this.orderUpdateRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/order-updates/{id}')
  @response(204, {
    description: 'OrderUpdate PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderUpdate, {partial: true}),
        },
      },
    })
    orderUpdate: OrderUpdate,
  ): Promise<void> {
    await this.orderUpdateRepository.updateById(id, orderUpdate);
  }

  @authenticate('jwt')
  @put('/order-updates/{id}')
  @response(204, {
    description: 'OrderUpdate PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderUpdate: OrderUpdate,
  ): Promise<void> {
    await this.orderUpdateRepository.replaceById(id, orderUpdate);
  }

  @authenticate('jwt')
  @del('/order-updates/{id}')
  @response(204, {
    description: 'OrderUpdate DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderUpdateRepository.deleteById(id);
  }
}
