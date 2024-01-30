import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {AddonGroup, AddonGroupRelations, Addon, AddonGroupAddon} from '../models';
import {AddonGroupAddonRepository} from './addon-group-addon.repository';
import {AddonRepository} from './addon.repository';

export class AddonGroupRepository extends DefaultCrudRepository<
  AddonGroup,
  typeof AddonGroup.prototype.addonGroupId,
  AddonGroupRelations
> {

  public readonly addonGroupAddon: HasManyThroughRepositoryFactory<Addon, typeof Addon.prototype.addonId,
          AddonGroupAddon,
          typeof AddonGroup.prototype.addonGroupId
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('AddonGroupAddonRepository') protected addonGroupAddonRepositoryGetter: Getter<AddonGroupAddonRepository>, @repository.getter('AddonRepository') protected addonRepositoryGetter: Getter<AddonRepository>,
  ) {
    super(AddonGroup, dataSource);
    this.addonGroupAddon = this.createHasManyThroughRepositoryFactoryFor('addonGroupAddon', addonRepositoryGetter, addonGroupAddonRepositoryGetter,);
    this.registerInclusionResolver('addonGroupAddon', this.addonGroupAddon.inclusionResolver);
  }
}
