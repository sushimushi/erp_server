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
import {Discount} from '../models';
import {DiscountRepository} from '../repositories';

export class DiscountController {
  constructor(
    @repository(DiscountRepository)
    public discountRepository : DiscountRepository,
  ) {}

  @authenticate('jwt')
  @post('/discounts')
  @response(200, {
    description: 'Discount model instance',
    content: {'application/json': {schema: getModelSchemaRef(Discount)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, {
            title: 'NewDiscount',
            exclude: ['discountId'],
          }),
        },
      },
    })
    discount: Omit<Discount, 'discountId'>,
  ): Promise<Discount> {
    return this.discountRepository.create(discount);
  }

  @authenticate('jwt')
  @get('/discounts/count')
  @response(200, {
    description: 'Discount model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Discount) where?: Where<Discount>,
  ): Promise<Count> {
    return this.discountRepository.count(where);
  }

  @authenticate('jwt')
  @get('/discounts')
  @response(200, {
    description: 'Array of Discount model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Discount, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Discount) filter?: Filter<Discount>,
  ): Promise<Discount[]> {
    return this.discountRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/discounts')
  @response(200, {
    description: 'Discount PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, {partial: true}),
        },
      },
    })
    discount: Discount,
    @param.where(Discount) where?: Where<Discount>,
  ): Promise<Count> {
    return this.discountRepository.updateAll(discount, where);
  }

  @authenticate('jwt')
  @get('/discounts/{id}')
  @response(200, {
    description: 'Discount model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Discount, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Discount, {exclude: 'where'}) filter?: FilterExcludingWhere<Discount>
  ): Promise<Discount> {
    return this.discountRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/discounts/{id}')
  @response(204, {
    description: 'Discount PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, {partial: true}),
        },
      },
    })
    discount: Discount,
  ): Promise<void> {
    await this.discountRepository.updateById(id, discount);
  }

  @authenticate('jwt')
  @put('/discounts/{id}')
  @response(204, {
    description: 'Discount PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() discount: Discount,
  ): Promise<void> {
    await this.discountRepository.replaceById(id, discount);
  }

  @authenticate('jwt')
  @del('/discounts/{id}')
  @response(204, {
    description: 'Discount DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.discountRepository.deleteById(id);
  }
}
