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
import {DiscountRule} from '../models';
import {DiscountRuleRepository} from '../repositories';

export class DiscountRuleController {
  constructor(
    @repository(DiscountRuleRepository)
    public discountRuleRepository : DiscountRuleRepository,
  ) {}

  @authenticate('jwt')
  @post('/discount-rules')
  @response(200, {
    description: 'DiscountRule model instance',
    content: {'application/json': {schema: getModelSchemaRef(DiscountRule)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiscountRule, {
            title: 'NewDiscountRule',
            exclude: ['discountRuleId'],
          }),
        },
      },
    })
    discountRule: Omit<DiscountRule, 'discountRuleId'>,
  ): Promise<DiscountRule> {
    return this.discountRuleRepository.create(discountRule);
  }

  @authenticate('jwt')
  @get('/discount-rules/count')
  @response(200, {
    description: 'DiscountRule model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DiscountRule) where?: Where<DiscountRule>,
  ): Promise<Count> {
    return this.discountRuleRepository.count(where);
  }

  @authenticate('jwt')
  @get('/discount-rules')
  @response(200, {
    description: 'Array of DiscountRule model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DiscountRule, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DiscountRule) filter?: Filter<DiscountRule>,
  ): Promise<DiscountRule[]> {
    return this.discountRuleRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/discount-rules')
  @response(200, {
    description: 'DiscountRule PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiscountRule, {partial: true}),
        },
      },
    })
    discountRule: DiscountRule,
    @param.where(DiscountRule) where?: Where<DiscountRule>,
  ): Promise<Count> {
    return this.discountRuleRepository.updateAll(discountRule, where);
  }

  @authenticate('jwt')
  @get('/discount-rules/{id}')
  @response(200, {
    description: 'DiscountRule model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DiscountRule, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DiscountRule, {exclude: 'where'}) filter?: FilterExcludingWhere<DiscountRule>
  ): Promise<DiscountRule> {
    return this.discountRuleRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/discount-rules/{id}')
  @response(204, {
    description: 'DiscountRule PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DiscountRule, {partial: true}),
        },
      },
    })
    discountRule: DiscountRule,
  ): Promise<void> {
    await this.discountRuleRepository.updateById(id, discountRule);
  }

  @put('/discount-rules/{id}')
  @response(204, {
    description: 'DiscountRule PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() discountRule: DiscountRule,
  ): Promise<void> {
    await this.discountRuleRepository.replaceById(id, discountRule);
  }

  @del('/discount-rules/{id}')
  @response(204, {
    description: 'DiscountRule DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.discountRuleRepository.deleteById(id);
  }
}
