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
import {Refund} from '../models';
import {RefundRepository} from '../repositories';

export class RefundController {
  constructor(
    @repository(RefundRepository)
    public refundRepository : RefundRepository,
  ) {}

  @post('/refunds')
  @response(200, {
    description: 'Refund model instance',
    content: {'application/json': {schema: getModelSchemaRef(Refund)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Refund, {
            title: 'NewRefund',
            exclude: ['refundId'],
          }),
        },
      },
    })
    refund: Omit<Refund, 'refundId'>,
  ): Promise<Refund> {
    return this.refundRepository.create(refund);
  }

  @get('/refunds/count')
  @response(200, {
    description: 'Refund model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Refund) where?: Where<Refund>,
  ): Promise<Count> {
    return this.refundRepository.count(where);
  }

  @get('/refunds')
  @response(200, {
    description: 'Array of Refund model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Refund, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Refund) filter?: Filter<Refund>,
  ): Promise<Refund[]> {
    return this.refundRepository.find(filter);
  }

  @patch('/refunds')
  @response(200, {
    description: 'Refund PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Refund, {partial: true}),
        },
      },
    })
    refund: Refund,
    @param.where(Refund) where?: Where<Refund>,
  ): Promise<Count> {
    return this.refundRepository.updateAll(refund, where);
  }

  @get('/refunds/{id}')
  @response(200, {
    description: 'Refund model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Refund, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Refund, {exclude: 'where'}) filter?: FilterExcludingWhere<Refund>
  ): Promise<Refund> {
    return this.refundRepository.findById(id, filter);
  }

  @patch('/refunds/{id}')
  @response(204, {
    description: 'Refund PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Refund, {partial: true}),
        },
      },
    })
    refund: Refund,
  ): Promise<void> {
    await this.refundRepository.updateById(id, refund);
  }

  @put('/refunds/{id}')
  @response(204, {
    description: 'Refund PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() refund: Refund,
  ): Promise<void> {
    await this.refundRepository.replaceById(id, refund);
  }

  @del('/refunds/{id}')
  @response(204, {
    description: 'Refund DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.refundRepository.deleteById(id);
  }
}
