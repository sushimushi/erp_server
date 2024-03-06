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
import {CustomPettyCashCategories} from '../models';
import {CustomPettyCashCategoriesRepository} from '../repositories';

export class CustomPettyCashCategoriesController {
  constructor(
    @repository(CustomPettyCashCategoriesRepository)
    public customPettyCashCategoriesRepository : CustomPettyCashCategoriesRepository,
  ) {}

  @post('/custom-petty-cash-categories')
  @response(200, {
    description: 'CustomPettyCashCategories model instance',
    content: {'application/json': {schema: getModelSchemaRef(CustomPettyCashCategories)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomPettyCashCategories, {
            title: 'NewCustomPettyCashCategories',
            exclude: ['customPettyCashCategoriesId'],
          }),
        },
      },
    })
    customPettyCashCategories: Omit<CustomPettyCashCategories, 'customPettyCashCategoriesId'>,
  ): Promise<CustomPettyCashCategories> {
    return this.customPettyCashCategoriesRepository.create(customPettyCashCategories);
  }

  @get('/custom-petty-cash-categories/count')
  @response(200, {
    description: 'CustomPettyCashCategories model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CustomPettyCashCategories) where?: Where<CustomPettyCashCategories>,
  ): Promise<Count> {
    return this.customPettyCashCategoriesRepository.count(where);
  }

  @get('/custom-petty-cash-categories')
  @response(200, {
    description: 'Array of CustomPettyCashCategories model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CustomPettyCashCategories, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CustomPettyCashCategories) filter?: Filter<CustomPettyCashCategories>,
  ): Promise<CustomPettyCashCategories[]> {
    return this.customPettyCashCategoriesRepository.find(filter);
  }

  @patch('/custom-petty-cash-categories')
  @response(200, {
    description: 'CustomPettyCashCategories PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomPettyCashCategories, {partial: true}),
        },
      },
    })
    customPettyCashCategories: CustomPettyCashCategories,
    @param.where(CustomPettyCashCategories) where?: Where<CustomPettyCashCategories>,
  ): Promise<Count> {
    return this.customPettyCashCategoriesRepository.updateAll(customPettyCashCategories, where);
  }

  @get('/custom-petty-cash-categories/{id}')
  @response(200, {
    description: 'CustomPettyCashCategories model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CustomPettyCashCategories, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CustomPettyCashCategories, {exclude: 'where'}) filter?: FilterExcludingWhere<CustomPettyCashCategories>
  ): Promise<CustomPettyCashCategories> {
    return this.customPettyCashCategoriesRepository.findById(id, filter);
  }

  @patch('/custom-petty-cash-categories/{id}')
  @response(204, {
    description: 'CustomPettyCashCategories PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomPettyCashCategories, {partial: true}),
        },
      },
    })
    customPettyCashCategories: CustomPettyCashCategories,
  ): Promise<void> {
    await this.customPettyCashCategoriesRepository.updateById(id, customPettyCashCategories);
  }

  @put('/custom-petty-cash-categories/{id}')
  @response(204, {
    description: 'CustomPettyCashCategories PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() customPettyCashCategories: CustomPettyCashCategories,
  ): Promise<void> {
    await this.customPettyCashCategoriesRepository.replaceById(id, customPettyCashCategories);
  }

  @del('/custom-petty-cash-categories/{id}')
  @response(204, {
    description: 'CustomPettyCashCategories DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customPettyCashCategoriesRepository.deleteById(id);
  }
}
