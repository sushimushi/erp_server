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
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {TaxGroup} from '../models';
import {TaxGroupRepository} from '../repositories';

export class TaxGroupController {
  constructor(
    @repository(TaxGroupRepository)
    public taxGroupRepository : TaxGroupRepository,
  ) {}

  @authenticate('jwt')
  @post('/tax-groups')
  @response(200, {
    description: 'TaxGroup model instance',
    content: {'application/json': {schema: getModelSchemaRef(TaxGroup)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaxGroup, {
            title: 'NewTaxGroup',
            exclude: ['taxGroupId'],
          }),
        },
      },
    })
    taxGroup: Omit<TaxGroup, 'taxGroupId'>,
  ): Promise<TaxGroup> {
    return this.taxGroupRepository.create(taxGroup);
  }

  @get('/tax-groups/count')
  @response(200, {
    description: 'TaxGroup model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TaxGroup) where?: Where<TaxGroup>,
  ): Promise<Count> {
    return this.taxGroupRepository.count(where);
  }

  @get('/tax-groups')
  @response(200, {
    description: 'Array of TaxGroup model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TaxGroup, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TaxGroup) filter?: Filter<TaxGroup>,
  ): Promise<TaxGroup[]> {
    return this.taxGroupRepository.find(filter);
  }

  @patch('/tax-groups')
  @response(200, {
    description: 'TaxGroup PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaxGroup, {partial: true}),
        },
      },
    })
    taxGroup: TaxGroup,
    @param.where(TaxGroup) where?: Where<TaxGroup>,
  ): Promise<Count> {
    return this.taxGroupRepository.updateAll(taxGroup, where);
  }

  @get('/tax-groups/{id}')
  @response(200, {
    description: 'TaxGroup model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TaxGroup, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TaxGroup, {exclude: 'where'}) filter?: FilterExcludingWhere<TaxGroup>
  ): Promise<TaxGroup> {
    return this.taxGroupRepository.findById(id, filter);
  }

  @patch('/tax-groups/{id}')
  @response(204, {
    description: 'TaxGroup PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaxGroup, {partial: true}),
        },
      },
    })
    taxGroup: TaxGroup,
  ): Promise<void> {
    await this.taxGroupRepository.updateById(id, taxGroup);
  }

  @put('/tax-groups/{id}')
  @response(204, {
    description: 'TaxGroup PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() taxGroup: TaxGroup,
  ): Promise<void> {
    await this.taxGroupRepository.replaceById(id, taxGroup);
  }

  @del('/tax-groups/{id}')
  @response(204, {
    description: 'TaxGroup DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.taxGroupRepository.deleteById(id);
  }
}
