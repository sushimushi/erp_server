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
  Product,
  VariantGroup
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductVariantGroupController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/variant-groups', {
    responses: {
      '200': {
        description: 'Array of Product has many VariantGroup through ProductVariantGroup',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VariantGroup)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VariantGroup>,
  ): Promise<VariantGroup[]> {
    return this.productRepository.productVariantGroup(id).find(filter);
  }

  @authenticate('jwt')
  @post('/products/{id}/variant-groups', {
    responses: {
      '200': {
        description: 'create a VariantGroup model instance',
        content: {'application/json': {schema: getModelSchemaRef(VariantGroup)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.productId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariantGroup, {
            title: 'NewVariantGroupInProduct',
            exclude: ['variantGroupId'],
          }),
        },
      },
    }) variantGroup: Omit<VariantGroup, 'variantGroupId'>,
  ): Promise<VariantGroup> {
    return this.productRepository.productVariantGroup(id).create(variantGroup);
  }

  @patch('/products/{id}/variant-groups', {
    responses: {
      '200': {
        description: 'Product.VariantGroup PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VariantGroup, {partial: true}),
        },
      },
    })
    variantGroup: Partial<VariantGroup>,
    @param.query.object('where', getWhereSchemaFor(VariantGroup)) where?: Where<VariantGroup>,
  ): Promise<Count> {
    return this.productRepository.productVariantGroup(id).patch(variantGroup, where);
  }

  @del('/products/{id}/variant-groups', {
    responses: {
      '200': {
        description: 'Product.VariantGroup DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VariantGroup)) where?: Where<VariantGroup>,
  ): Promise<Count> {
    return this.productRepository.productVariantGroup(id).delete(where);
  }
}
