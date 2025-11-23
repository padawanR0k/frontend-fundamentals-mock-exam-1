import { Assets, colors, ListRow } from 'tosslib';
import { SavingProduct } from '../common/type';

interface SavingsProductsProps {
  products: SavingProduct[];
  selectedProduct: SavingProduct | null;
  onSelectProduct: (product: SavingProduct) => void;
}

export function SavingsProducts({ products, selectedProduct, onSelectProduct }: SavingsProductsProps) {
  return (
    <>
      {products.map(product => {
        const isSelected = product.id === selectedProduct?.id;
        return (
          <ListRow
            key={product.id}
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={product.name}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: ${product.annualRate}%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            right={isSelected && <Assets.Icon name="icon-check-circle-green" />}
            onClick={() => onSelectProduct(product)}
          />
        );
      })}
    </>
  );
}

export interface UserFilter {
  monthlyDeposit: number;
  depositPeriod: number;
}

export function filterByUserTarget(product: SavingProduct, userFilter: UserFilter): boolean {
  if (product.minMonthlyAmount > userFilter.monthlyDeposit) {
    return false;
  }

  if (product.maxMonthlyAmount < userFilter.monthlyDeposit) {
    return false;
  }

  if (product.availableTerms !== userFilter.depositPeriod) {
    return false;
  }

  return true;
}

export function isFilterActive(userFilter: UserFilter): boolean {
  return userFilter.monthlyDeposit > 0 && userFilter.depositPeriod > 0;
}

export function applyUserFilter(products: SavingProduct[], userFilter: UserFilter): SavingProduct[] {
  if (!isFilterActive(userFilter)) {
    return products;
  }

  return products.filter(product => filterByUserTarget(product, userFilter));
}
