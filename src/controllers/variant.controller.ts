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
import {Variant} from '../models';
import {VariantRepository} from '../repositories';

export class VariantController {
  constructor(
    @repository(VariantRepository)
    public variantRepository : VariantRepository,
  ) {}

  @post('/variants')
  @response(200, {
    description: 'Variant model instance',
    content: {'application/json': {schema: getModelSchemaRef(Variant)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Variant, {
            title: 'NewVariant',
            exclude: ['variantId'],
          }),
        },
      },
    })
    variant: Omit<Variant, 'variantId'>,
  ): Promise<Variant> {
    return this.variantRepository.create(variant);
  }

  @get('/variants/count')
  @response(200, {
    description: 'Variant model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Variant) where?: Where<Variant>,
  ): Promise<Count> {
    return this.variantRepository.count(where);
  }

  @get('/variants')
  @response(200, {
    description: 'Array of Variant model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Variant, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Variant) filter?: Filter<Variant>,
  ): Promise<Variant[]> {
    return this.variantRepository.find(filter);
  }

  @patch('/variants')
  @response(200, {
    description: 'Variant PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Variant, {partial: true}),
        },
      },
    })
    variant: Variant,
    @param.where(Variant) where?: Where<Variant>,
  ): Promise<Count> {
    return this.variantRepository.updateAll(variant, where);
  }

  @get('/variants/{id}')
  @response(200, {
    description: 'Variant model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Variant, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Variant, {exclude: 'where'}) filter?: FilterExcludingWhere<Variant>
  ): Promise<Variant> {
    return this.variantRepository.findById(id, filter);
  }

  @patch('/variants/{id}')
  @response(204, {
    description: 'Variant PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Variant, {partial: true}),
        },
      },
    })
    variant: Variant,
  ): Promise<void> {
    await this.variantRepository.updateById(id, variant);
  }

  @put('/variants/{id}')
  @response(204, {
    description: 'Variant PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() variant: Variant,
  ): Promise<void> {
    await this.variantRepository.replaceById(id, variant);
  }

  @del('/variants/{id}')
  @response(204, {
    description: 'Variant DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.variantRepository.deleteById(id);
  }
}
