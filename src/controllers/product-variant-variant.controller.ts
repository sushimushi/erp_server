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
  ProductVariant,
  Variant,
} from '../models';
import {ProductVariantRepository} from '../repositories';

export class ProductVariantVariantController {
  constructor(
    @repository(ProductVariantRepository) protected productVariantRepository: ProductVariantRepository,
  ) { }

  @get('/product-variants/{id}/variants', {
    responses: {
      '200': {
        description: 'Array of ProductVariant has many Variant',
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
    return this.productVariantRepository.variants(id).find(filter);
  }

  @authenticate('jwt')
  @post('/product-variants/{id}/variants', {
    responses: {
      '200': {
        description: 'ProductVariant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Variant)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProductVariant.prototype.variantId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Variant, {
            title: 'NewVariantInProductVariant',
            exclude: ['variantId'],
            optional: ['variantId']
          }),
        },
      },
    }) variant: Omit<Variant, 'variantId'>,
  ): Promise<Variant> {
    return this.productVariantRepository.variants(id).create(variant);
  }

  @patch('/product-variants/{id}/variants', {
    responses: {
      '200': {
        description: 'ProductVariant.Variant PATCH success count',
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
    return this.productVariantRepository.variants(id).patch(variant, where);
  }

  @del('/product-variants/{id}/variants', {
    responses: {
      '200': {
        description: 'ProductVariant.Variant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Variant)) where?: Where<Variant>,
  ): Promise<Count> {
    return this.productVariantRepository.variants(id).delete(where);
  }
}
