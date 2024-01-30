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
OrderTaxGroup,
TaxGroup,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderTaxGroupController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/tax-groups', {
    responses: {
      '200': {
        description: 'Array of Order has many TaxGroup through OrderTaxGroup',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TaxGroup)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TaxGroup>,
  ): Promise<TaxGroup[]> {
    return this.orderRepository.orderTaxGroup(id).find(filter);
  }

  @post('/orders/{id}/tax-groups', {
    responses: {
      '200': {
        description: 'create a TaxGroup model instance',
        content: {'application/json': {schema: getModelSchemaRef(TaxGroup)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.orderId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaxGroup, {
            title: 'NewTaxGroupInOrder',
            exclude: ['taxGroupId'],
          }),
        },
      },
    }) taxGroup: Omit<TaxGroup, 'taxGroupId'>,
  ): Promise<TaxGroup> {
    return this.orderRepository.orderTaxGroup(id).create(taxGroup);
  }

  @patch('/orders/{id}/tax-groups', {
    responses: {
      '200': {
        description: 'Order.TaxGroup PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaxGroup, {partial: true}),
        },
      },
    })
    taxGroup: Partial<TaxGroup>,
    @param.query.object('where', getWhereSchemaFor(TaxGroup)) where?: Where<TaxGroup>,
  ): Promise<Count> {
    return this.orderRepository.orderTaxGroup(id).patch(taxGroup, where);
  }

  @del('/orders/{id}/tax-groups', {
    responses: {
      '200': {
        description: 'Order.TaxGroup DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TaxGroup)) where?: Where<TaxGroup>,
  ): Promise<Count> {
    return this.orderRepository.orderTaxGroup(id).delete(where);
  }
}
