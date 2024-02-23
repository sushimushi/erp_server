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
  Tax,
  TaxGroup
} from '../models';
import {TaxGroupRepository} from '../repositories';

export class TaxGroupTaxController {
  constructor(
    @repository(TaxGroupRepository) protected taxGroupRepository: TaxGroupRepository,
  ) { }

  @get('/tax-groups/{id}/taxes', {
    responses: {
      '200': {
        description: 'Array of TaxGroup has many Tax through TaxGroupTax',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tax)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Tax>,
  ): Promise<Tax[]> {
    return this.taxGroupRepository.taxes(id).find(filter);
  }

  @authenticate('jwt')
  @post('/tax-groups/{id}/taxes', {
    responses: {
      '200': {
        description: 'create a Tax model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tax)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TaxGroup.prototype.taxGroupId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tax, {
            title: 'NewTaxInTaxGroup',
            exclude: ['taxId'],
          }),
        },
      },
    }) tax: Omit<Tax, 'taxId'>,
  ): Promise<Tax> {
    return this.taxGroupRepository.taxes(id).create(tax);
  }

  @patch('/tax-groups/{id}/taxes', {
    responses: {
      '200': {
        description: 'TaxGroup.Tax PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tax, {partial: true}),
        },
      },
    })
    tax: Partial<Tax>,
    @param.query.object('where', getWhereSchemaFor(Tax)) where?: Where<Tax>,
  ): Promise<Count> {
    return this.taxGroupRepository.taxes(id).patch(tax, where);
  }

  @del('/tax-groups/{id}/taxes', {
    responses: {
      '200': {
        description: 'TaxGroup.Tax DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Tax)) where?: Where<Tax>,
  ): Promise<Count> {
    return this.taxGroupRepository.taxes(id).delete(where);
  }
}
