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
import {CustomField} from '../models';
import {CustomFieldRepository} from '../repositories';

export class CustomFieldController {
  constructor(
    @repository(CustomFieldRepository)
    public customFieldRepository: CustomFieldRepository,
  ) {}

  @post('/custom-fields')
  @response(200, {
    description: 'CustomField model instance',
    content: {'application/json': {schema: getModelSchemaRef(CustomField)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomField, {
            title: 'NewCustomField',
            exclude: ['customFieldId'],
          }),
        },
      },
    })
    customField: Omit<CustomField, 'customFieldId'>,
  ): Promise<CustomField> {
    return this.customFieldRepository.create(customField);
  }

  @get('/custom-fields/count')
  @response(200, {
    description: 'CustomField model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CustomField) where?: Where<CustomField>,
  ): Promise<Count> {
    return this.customFieldRepository.count(where);
  }

  @get('/custom-fields')
  @response(200, {
    description: 'Array of CustomField model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CustomField, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CustomField) filter?: Filter<CustomField>,
  ): Promise<CustomField[]> {
    return this.customFieldRepository.find(filter);
  }

  @patch('/custom-fields')
  @response(200, {
    description: 'CustomField PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomField, {partial: true}),
        },
      },
    })
    customField: CustomField,
    @param.where(CustomField) where?: Where<CustomField>,
  ): Promise<Count> {
    return this.customFieldRepository.updateAll(customField, where);
  }

  @get('/custom-fields/{id}')
  @response(200, {
    description: 'CustomField model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CustomField, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CustomField, {exclude: 'where'})
    filter?: FilterExcludingWhere<CustomField>,
  ): Promise<CustomField> {
    return this.customFieldRepository.findById(id, filter);
  }

  @patch('/custom-fields/{id}')
  @response(204, {
    description: 'CustomField PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomField, {partial: true}),
        },
      },
    })
    customField: CustomField,
  ): Promise<void> {
    await this.customFieldRepository.updateById(id, customField);
  }

  @put('/custom-fields/{id}')
  @response(204, {
    description: 'CustomField PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() customField: CustomField,
  ): Promise<void> {
    await this.customFieldRepository.replaceById(id, customField);
  }

  @del('/custom-fields/{id}')
  @response(204, {
    description: 'CustomField DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customFieldRepository.deleteById(id);
  }
}
