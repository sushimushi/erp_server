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
ProductOrder,
Product,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderProductController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Order has many Product through ProductOrder',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.orderRepository.products(id).find(filter);
  }

  @post('/orders/{id}/products', {
    responses: {
      '200': {
        description: 'create a Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.orderId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInOrder',
            exclude: ['productId'],
          }),
        },
      },
    }) product: Omit<Product, 'productId'>,
  ): Promise<Product> {
    return this.orderRepository.products(id).create(product);
  }

  @patch('/orders/{id}/products', {
    responses: {
      '200': {
        description: 'Order.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.orderRepository.products(id).patch(product, where);
  }

  @del('/orders/{id}/products', {
    responses: {
      '200': {
        description: 'Order.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.orderRepository.products(id).delete(where);
  }
}
