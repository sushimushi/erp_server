import {Model, model, property} from '@loopback/repository';

@model()
export class PermissionPreferences extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  permissionPreferenceId?: string;

  @property({
    type: 'string',
    required: true,
  })
  accountId: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isCashierAllowedToOfferDiscount: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isManagerAllowedToEditEmailAddress: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  isShiftSummaryHiddenOnLock: boolean;


  constructor(data?: Partial<PermissionPreferences>) {
    super(data);
  }
}

export interface PermissionPreferencesRelations {
  // describe navigational properties here
}

export type PermissionPreferencesWithRelations = PermissionPreferences & PermissionPreferencesRelations;
