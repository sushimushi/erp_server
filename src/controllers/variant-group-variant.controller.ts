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
VariantGroup,
VariantGroupVariant,
Variant,
} from '../models';
import {VariantGroupRepository} from '../repositories';

export class VariantGroupVariantController {
  constructor(
    @repository(VariantGroupRepository) protected variantGroupRepository: VariantGroupRepository,
  ) { }

  @get('/variant-groups/{id}/variants', {
    responses: {
      '200': {
        description: 'Array of VariantGroup has many Variant through VariantGroupVariant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Variant)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Variant>,
  ): Promise<Variant[]> {
    return this.variantGroupRepository.variants(id).find(filter);
  }

  @post('/variant-groups/{id}/variants', {
    responses: {
      '200': {
        description: 'create a Variant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Variant)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof VariantGroup.prototype.variantGroupId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Variant, {
            title: 'NewVariantInVariantGroup',
            exclude: ['variantId'],
          }),
        },
      },
    }) variant: Omit<Variant, 'variantId'>,
  ): Promise<Variant> {
    return this.variantGroupRepository.variants(id).create(variant);
  }

  @patch('/variant-groups/{id}/variants', {
    responses: {
      '200': {
        description: 'VariantGroup.Variant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Variant, {partial: true}),
        },
      },
    })
    variant: Partial<Variant>,
    @param.query.object('where', getWhereSchemaFor(Variant)) where?: Where<Variant>,
  ): Promise<Count> {
    return this.variantGroupRepository.variants(id).patch(variant, where);
  }

  @del('/variant-groups/{id}/variants', {
    responses: {
      '200': {
        description: 'VariantGroup.Variant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Variant)) where?: Where<Variant>,
  ): Promise<Count> {
    return this.variantGroupRepository.variants(id).delete(where);
  }
}
