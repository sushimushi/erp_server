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
Discount,
// DiscountRuleDiscount,
DiscountRule,
} from '../models';
import {DiscountRepository} from '../repositories';

export class DiscountDiscountRuleController {
  constructor(
    @repository(DiscountRepository) protected discountRepository: DiscountRepository,
  ) { }

  @authenticate('jwt')
  @get('/discounts/{id}/discount-rules', {
    responses: {
      '200': {
        description: 'Array of Discount has many DiscountRule through DiscountRuleDiscount',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DiscountRule)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DiscountRule>,
  ): Promise<DiscountRule[]> {
    return this.discountRepository.discountRuleDiscount(id).find(filter);
  }

  @authenticate('jwt')
  @post('/discounts/{id}/discount-rules', {
    responses: {
      '200': {
        description: 'create a DiscountRule model instance',
        content: {'application/json': {schema: getModelSchemaRef(DiscountRule)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Discount.prototype.discountId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiscountRule, {
            title: 'NewDiscountRuleInDiscount',
            exclude: ['discountRuleId'],
          }),
        },
      },
    }) discountRule: Omit<DiscountRule, 'discountRuleId'>,
  ): Promise<DiscountRule> {
    return this.discountRepository.discountRuleDiscount(id).create(discountRule);
  }

  @authenticate('jwt')
  @patch('/discounts/{id}/discount-rules', {
    responses: {
      '200': {
        description: 'Discount.DiscountRule PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiscountRule, {partial: true}),
        },
      },
    })
    discountRule: Partial<DiscountRule>,
    @param.query.object('where', getWhereSchemaFor(DiscountRule)) where?: Where<DiscountRule>,
  ): Promise<Count> {
    return this.discountRepository.discountRuleDiscount(id).patch(discountRule, where);
  }

  @authenticate('jwt')
  @del('/discounts/{id}/discount-rules', {
    responses: {
      '200': {
        description: 'Discount.DiscountRule DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DiscountRule)) where?: Where<DiscountRule>,
  ): Promise<Count> {
    return this.discountRepository.discountRuleDiscount(id).delete(where);
  }
}
