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
// OrderDiscount,
Discount,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderDiscountController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @authenticate('jwt')
  @get('/orders/{id}/discounts', {
    responses: {
      '200': {
        description: 'Array of Order has many Discount through OrderDiscount',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Discount)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Discount>,
  ): Promise<Discount[]> {
    return this.orderRepository.orderDiscount(id).find(filter);
  }

  @authenticate('jwt')
  @post('/orders/{id}/discounts', {
    responses: {
      '200': {
        description: 'create a Discount model instance',
        content: {'application/json': {schema: getModelSchemaRef(Discount)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.orderId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, {
            title: 'NewDiscountInOrder',
            exclude: ['discountId'],
          }),
        },
      },
    }) discount: Omit<Discount, 'discountId'>,
  ): Promise<Discount> {
    return this.orderRepository.orderDiscount(id).create(discount);
  }

  @authenticate('jwt')
  @patch('/orders/{id}/discounts', {
    responses: {
      '200': {
        description: 'Order.Discount PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, {partial: true}),
        },
      },
    })
    discount: Partial<Discount>,
    @param.query.object('where', getWhereSchemaFor(Discount)) where?: Where<Discount>,
  ): Promise<Count> {
    return this.orderRepository.orderDiscount(id).patch(discount, where);
  }

  @authenticate('jwt')
  @del('/orders/{id}/discounts', {
    responses: {
      '200': {
        description: 'Order.Discount DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Discount)) where?: Where<Discount>,
  ): Promise<Count> {
    return this.orderRepository.orderDiscount(id).delete(where);
  }
}
