import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Account} from './account.model';

@model()
export class SellingPreferences extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  sellingPreferenceId?: string;
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

  @belongsTo(() => Account)
  accountId: string;

  constructor(data?: Partial<SellingPreferences>) {
    super(data);
  }
}

export interface SellingPreferencesRelations {
  // describe navigational properties here
}

export type SellingPreferencesWithRelations = SellingPreferences & SellingPreferencesRelations;
