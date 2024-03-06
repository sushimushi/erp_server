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
import {OrderTicketGroup} from '../models';
import {OrderTicketGroupRepository} from '../repositories';

export class OrderTicketGroupController {
  constructor(
    @repository(OrderTicketGroupRepository)
    public orderTicketGroupRepository : OrderTicketGroupRepository,
  ) {}

  @post('/order-ticket-groups')
  @response(200, {
    description: 'OrderTicketGroup model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderTicketGroup)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderTicketGroup, {
            title: 'NewOrderTicketGroup',
            exclude: ['orderTicketGroupId'],
          }),
        },
      },
    })
    orderTicketGroup: Omit<OrderTicketGroup, 'orderTicketGroupId'>,
  ): Promise<OrderTicketGroup> {
    return this.orderTicketGroupRepository.create(orderTicketGroup);
  }

  @get('/order-ticket-groups/count')
  @response(200, {
    description: 'OrderTicketGroup model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderTicketGroup) where?: Where<OrderTicketGroup>,
  ): Promise<Count> {
    return this.orderTicketGroupRepository.count(where);
  }

  @get('/order-ticket-groups')
  @response(200, {
    description: 'Array of OrderTicketGroup model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderTicketGroup, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderTicketGroup) filter?: Filter<OrderTicketGroup>,
  ): Promise<OrderTicketGroup[]> {
    return this.orderTicketGroupRepository.find(filter);
  }

  @patch('/order-ticket-groups')
  @response(200, {
    description: 'OrderTicketGroup PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderTicketGroup, {partial: true}),
        },
      },
    })
    orderTicketGroup: OrderTicketGroup,
    @param.where(OrderTicketGroup) where?: Where<OrderTicketGroup>,
  ): Promise<Count> {
    return this.orderTicketGroupRepository.updateAll(orderTicketGroup, where);
  }

  @get('/order-ticket-groups/{id}')
  @response(200, {
    description: 'OrderTicketGroup model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderTicketGroup, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrderTicketGroup, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderTicketGroup>
  ): Promise<OrderTicketGroup> {
    return this.orderTicketGroupRepository.findById(id, filter);
  }

  @patch('/order-ticket-groups/{id}')
  @response(204, {
    description: 'OrderTicketGroup PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderTicketGroup, {partial: true}),
        },
      },
    })
    orderTicketGroup: OrderTicketGroup,
  ): Promise<void> {
    await this.orderTicketGroupRepository.updateById(id, orderTicketGroup);
  }

  @put('/order-ticket-groups/{id}')
  @response(204, {
    description: 'OrderTicketGroup PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderTicketGroup: OrderTicketGroup,
  ): Promise<void> {
    await this.orderTicketGroupRepository.replaceById(id, orderTicketGroup);
  }

  @del('/order-ticket-groups/{id}')
  @response(204, {
    description: 'OrderTicketGroup DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderTicketGroupRepository.deleteById(id);
  }
}
