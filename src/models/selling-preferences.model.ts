import {Model, model, property} from '@loopback/repository';

@model()
export class SellingPreferences extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  sellingPreferenceId?: string;

  @property({
    type: 'string',
    required: true,
  })
  accountId: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isRoundoffDisabled: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isQuantityModalPromptEnabled: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isOrderTicketEnabled: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isListViewDefault: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isSequentialLrnEnforced: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isQuickBillingEnabled: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isIncomingOrderEnabled: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isQuantityIncreaseDecreaseButtonDisabled: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isAllAndTopCategoryHidden: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isCustomerDataEnforced: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isShiftEnforced: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isAutoKotEnabledForOrders: boolean;


  constructor(data?: Partial<SellingPreferences>) {
    super(data);
  }
}

export interface SellingPreferencesRelations {
  // describe navigational properties here
}

export type SellingPreferencesWithRelations = SellingPreferences & SellingPreferencesRelations;
