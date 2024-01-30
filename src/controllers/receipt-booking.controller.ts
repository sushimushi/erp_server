import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Receipt,
  Booking,
} from '../models';
import {ReceiptRepository} from '../repositories';

export class ReceiptBookingController {
  constructor(
    @repository(ReceiptRepository)
    public receiptRepository: ReceiptRepository,
  ) { }

  @get('/receipts/{id}/booking', {
    responses: {
      '200': {
        description: 'Booking belonging to Receipt',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Booking),
          },
        },
      },
    },
  })
  async getBooking(
    @param.path.string('id') id: typeof Receipt.prototype.receiptId,
  ): Promise<Booking> {
    return this.receiptRepository.booking(id);
  }
}
