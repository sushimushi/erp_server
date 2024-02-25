import {authenticate} from '@loopback/authentication';
import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderTicketGroup,
  Category,
} from '../models';
import {OrderTicketGroupRepository} from '../repositories';

export class OrderTicketGroupCategoryController {
  constructor(
    @repository(OrderTicketGroupRepository)
    public orderTicketGroupRepository: OrderTicketGroupRepository,
  ) { }

  @authenticate('jwt')
  @get('/order-ticket-groups/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to OrderTicketGroup',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof OrderTicketGroup.prototype.orderTicketGroupId,
  ): Promise<Category> {
    return this.orderTicketGroupRepository.category(id);
  }
}
