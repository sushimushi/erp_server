import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {VariantGroup, VariantGroupRelations, Variant, VariantGroupVariant} from '../models';
import {VariantGroupVariantRepository} from './variant-group-variant.repository';
import {VariantRepository} from './variant.repository';

export class VariantGroupRepository extends DefaultCrudRepository<
  VariantGroup,
  typeof VariantGroup.prototype.variantGroupId,
  VariantGroupRelations
> {

  public readonly variants: HasManyThroughRepositoryFactory<Variant, typeof Variant.prototype.variantId,
          VariantGroupVariant,
          typeof VariantGroup.prototype.variantGroupId
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('VariantGroupVariantRepository') protected variantGroupVariantRepositoryGetter: Getter<VariantGroupVariantRepository>, @repository.getter('VariantRepository') protected variantRepositoryGetter: Getter<VariantRepository>,
  ) {
    super(VariantGroup, dataSource);
    this.variants = this.createHasManyThroughRepositoryFactoryFor('variants', variantRepositoryGetter, variantGroupVariantRepositoryGetter,);
    this.registerInclusionResolver('variants', this.variants.inclusionResolver);
  }
}
