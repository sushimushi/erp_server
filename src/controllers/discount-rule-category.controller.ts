// import {
//   Count,
//   CountSchema,
//   Filter,
//   repository,
//   Where,
// } from '@loopback/repository';
//   import {
//   del,
//   get,
//   getModelSchemaRef,
//   getWhereSchemaFor,
//   param,
//   patch,
//   post,
//   requestBody,
// } from '@loopback/rest';
// import {
// DiscountRule,
// DiscountRuleCategory,
// Category,
// } from '../models';
// import {DiscountRuleRepository} from '../repositories';

// export class DiscountRuleCategoryController {
//   constructor(
//     @repository(DiscountRuleRepository) protected discountRuleRepository: DiscountRuleRepository,
//   ) { }

//   @get('/discount-rules/{id}/categories', {
//     responses: {
//       '200': {
//         description: 'Array of DiscountRule has many Category through DiscountRuleCategory',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: getModelSchemaRef(Category)},
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.path.string('id') id: string,
//     @param.query.object('filter') filter?: Filter<Category>,
//   ): Promise<Category[]> {
//     return this.discountRuleRepository.selectedCategories(id).find(filter);
//   }

//   @post('/discount-rules/{id}/categories', {
//     responses: {
//       '200': {
//         description: 'create a Category model instance',
//         content: {'application/json': {schema: getModelSchemaRef(Category)}},
//       },
//     },
//   })
//   async create(
//     @param.path.string('id') id: typeof DiscountRule.prototype.discountRuleId,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Category, {
//             title: 'NewCategoryInDiscountRule',
//             exclude: ['categoryId'],
//           }),
//         },
//       },
//     }) category: Omit<Category, 'categoryId'>,
//   ): Promise<Category> {
//     return this.discountRuleRepository.selectedCategories(id).create(category);
//   }

//   @patch('/discount-rules/{id}/categories', {
//     responses: {
//       '200': {
//         description: 'DiscountRule.Category PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.string('id') id: string,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Category, {partial: true}),
//         },
//       },
//     })
//     category: Partial<Category>,
//     @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
//   ): Promise<Count> {
//     return this.discountRuleRepository.selectedCategories(id).patch(category, where);
//   }

//   @del('/discount-rules/{id}/categories', {
//     responses: {
//       '200': {
//         description: 'DiscountRule.Category DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.string('id') id: string,
//     @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
//   ): Promise<Count> {
//     return this.discountRuleRepository.selectedCategories(id).delete(where);
//   }
// }
