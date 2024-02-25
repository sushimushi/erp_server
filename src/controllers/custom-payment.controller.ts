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
import {CustomPayment} from '../models';
import {CustomPaymentRepository} from '../repositories';

export class CustomPaymentController {
  constructor(
    @repository(CustomPaymentRepository)
    public customPaymentRepository : CustomPaymentRepository,
  ) {}

  @authenticate('jwt')
  @post('/custom-payments')
  @response(200, {
    description: 'CustomPayment model instance',
    content: {'application/json': {schema: getModelSchemaRef(CustomPayment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomPayment, {
            title: 'NewCustomPayment',
            exclude: ['customPaymentId'],
          }),
        },
      },
    })
    customPayment: Omit<CustomPayment, 'customPaymentId'>,
  ): Promise<CustomPayment> {
    return this.customPaymentRepository.create(customPayment);
  }

  @authenticate('jwt')
  @get('/custom-payments/count')
  @response(200, {
    description: 'CustomPayment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CustomPayment) where?: Where<CustomPayment>,
  ): Promise<Count> {
    return this.customPaymentRepository.count(where);
  }

  @authenticate('jwt')
  @get('/custom-payments')
  @response(200, {
    description: 'Array of CustomPayment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CustomPayment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CustomPayment) filter?: Filter<CustomPayment>,
  ): Promise<CustomPayment[]> {
    return this.customPaymentRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/custom-payments')
  @response(200, {
    description: 'CustomPayment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomPayment, {partial: true}),
        },
      },
    })
    customPayment: CustomPayment,
    @param.where(CustomPayment) where?: Where<CustomPayment>,
  ): Promise<Count> {
    return this.customPaymentRepository.updateAll(customPayment, where);
  }

  @authenticate('jwt')
  @get('/custom-payments/{id}')
  @response(200, {
    description: 'CustomPayment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CustomPayment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CustomPayment, {exclude: 'where'}) filter?: FilterExcludingWhere<CustomPayment>
  ): Promise<CustomPayment> {
    return this.customPaymentRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/custom-payments/{id}')
  @response(204, {
    description: 'CustomPayment PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomPayment, {partial: true}),
        },
      },
    })
    customPayment: CustomPayment,
  ): Promise<void> {
    await this.customPaymentRepository.updateById(id, customPayment);
  }

  @authenticate('jwt')
  @put('/custom-payments/{id}')
  @response(204, {
    description: 'CustomPayment PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() customPayment: CustomPayment,
  ): Promise<void> {
    await this.customPaymentRepository.replaceById(id, customPayment);
  }

  @authenticate('jwt')
  @del('/custom-payments/{id}')
  @response(204, {
    description: 'CustomPayment DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customPaymentRepository.deleteById(id);
  }
}
