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
Discount,
DiscountRuleCategory,
Category,
} from '../models';
import {DiscountRepository} from '../repositories';

export class DiscountCategoryController {
  constructor(
    @repository(DiscountRepository) protected discountRepository: DiscountRepository,
  ) { }

  @get('/discounts/{id}/categories', {
    responses: {
      '200': {
        description: 'Array of Discount has many Category through DiscountRuleCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Category>,
  ): Promise<Category[]> {
    return this.discountRepository.selectedCategories(id).find(filter);
  }

  @post('/discounts/{id}/categories', {
    responses: {
      '200': {
        description: 'create a Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(Category)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Discount.prototype.discountId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategoryInDiscount',
            exclude: ['categoryId'],
          }),
        },
      },
    }) category: Omit<Category, 'categoryId'>,
  ): Promise<Category> {
    return this.discountRepository.selectedCategories(id).create(category);
  }

  @patch('/discounts/{id}/categories', {
    responses: {
      '200': {
        description: 'Discount.Category PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Partial<Category>,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.discountRepository.selectedCategories(id).patch(category, where);
  }

  @del('/discounts/{id}/categories', {
    responses: {
      '200': {
        description: 'Discount.Category DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.discountRepository.selectedCategories(id).delete(where);
  }
}
