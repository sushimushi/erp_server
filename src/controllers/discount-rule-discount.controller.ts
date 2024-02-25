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
DiscountRule,
// DiscountRuleDiscount,
Discount,
} from '../models';
import {DiscountRuleRepository} from '../repositories';

export class DiscountRuleDiscountController {
  constructor(
    @repository(DiscountRuleRepository) protected discountRuleRepository: DiscountRuleRepository,
  ) { }

  @authenticate('jwt')
  @get('/discount-rules/{id}/discounts', {
    responses: {
      '200': {
        description: 'Array of DiscountRule has many Discount through DiscountRuleDiscount',
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
    return this.discountRuleRepository.discounts(id).find(filter);
  }

  @authenticate('jwt')
  @post('/discount-rules/{id}/discounts', {
    responses: {
      '200': {
        description: 'create a Discount model instance',
        content: {'application/json': {schema: getModelSchemaRef(Discount)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DiscountRule.prototype.discountRuleId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Discount, {
            title: 'NewDiscountInDiscountRule',
            exclude: ['discountId'],
          }),
        },
      },
    }) discount: Omit<Discount, 'discountId'>,
  ): Promise<Discount> {
    return this.discountRuleRepository.discounts(id).create(discount);
  }

  @authenticate('jwt')
  @patch('/discount-rules/{id}/discounts', {
    responses: {
      '200': {
        description: 'DiscountRule.Discount PATCH success count',
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
    return this.discountRuleRepository.discounts(id).patch(discount, where);
  }

  @authenticate('jwt')
  @del('/discount-rules/{id}/discounts', {
    responses: {
      '200': {
        description: 'DiscountRule.Discount DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Discount)) where?: Where<Discount>,
  ): Promise<Count> {
    return this.discountRuleRepository.discounts(id).delete(where);
  }
}
