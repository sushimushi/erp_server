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
// DiscountRuleRegister,
Register,
} from '../models';
import {DiscountRuleRepository} from '../repositories';

export class DiscountRuleRegisterController {
  constructor(
    @repository(DiscountRuleRepository) protected discountRuleRepository: DiscountRuleRepository,
  ) { }

  @authenticate('jwt')
  @get('/discount-rules/{id}/registers', {
    responses: {
      '200': {
        description: 'Array of DiscountRule has many Register through DiscountRuleRegister',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Register)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Register>,
  ): Promise<Register[]> {
    return this.discountRuleRepository.registers(id).find(filter);
  }

  @authenticate('jwt')
  @post('/discount-rules/{id}/registers', {
    responses: {
      '200': {
        description: 'create a Register model instance',
        content: {'application/json': {schema: getModelSchemaRef(Register)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DiscountRule.prototype.discountRuleId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Register, {
            title: 'NewRegisterInDiscountRule',
            exclude: ['registerId'],
          }),
        },
      },
    }) register: Omit<Register, 'registerId'>,
  ): Promise<Register> {
    return this.discountRuleRepository.registers(id).create(register);
  }

  @authenticate('jwt')
  @patch('/discount-rules/{id}/registers', {
    responses: {
      '200': {
        description: 'DiscountRule.Register PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Register, {partial: true}),
        },
      },
    })
    register: Partial<Register>,
    @param.query.object('where', getWhereSchemaFor(Register)) where?: Where<Register>,
  ): Promise<Count> {
    return this.discountRuleRepository.registers(id).patch(register, where);
  }

  @authenticate('jwt')
  @del('/discount-rules/{id}/registers', {
    responses: {
      '200': {
        description: 'DiscountRule.Register DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Register)) where?: Where<Register>,
  ): Promise<Count> {
    return this.discountRuleRepository.registers(id).delete(where);
  }
}
