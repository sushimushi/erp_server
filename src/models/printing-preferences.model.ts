import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Account} from './account.model';

@model()
export class PrintingPreferences extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  printingPreferenceId?: string;
  @property({
    type: 'boolean',
    required: true,
  })
  isReceiptPrintedBeforePayment: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isProductNotesPrintedOnReceipt: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isProductTaxRateNotPrintedOnReceipt: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isPOSFooterNotPrinted: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isDisablePrintCopy: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isOrderTicketNumberPrintedOnReceipt: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isServerCopyPrinted: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isLargerFontKot: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isReceiptDetailsPrintedOnKot: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isReceiptNotPrintedForOrders: boolean;

  @belongsTo(() => Account)
  accountId: string;

  constructor(data?: Partial<PrintingPreferences>) {
    super(data);
  }
}

export interface PrintingPreferencesRelations {
  // describe navigational properties here
}

export type PrintingPreferencesWithRelations = PrintingPreferences & PrintingPreferencesRelations;
