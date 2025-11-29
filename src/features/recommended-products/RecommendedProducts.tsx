import { SavingProduct } from '../../common/type';
import { applyUserFilter, SavingsProducts, UserFilter } from '../../entities/SavingProducts';
import { RECOMMEND_SAVIING_PRODUCTS_COUNT } from './constants';

interface RecommendedProductsProps {
  products: SavingProduct[];
  selectedProduct: SavingProduct | null;
  onSelectProduct: (product: SavingProduct) => void;
  userFilter: UserFilter;
}

export function RecommendedProducts({ products, selectedProduct, onSelectProduct, userFilter }: RecommendedProductsProps) {
  const recommendedProducts = applyUserFilter(products, userFilter)
    .sort(orderByAnnualRateDesc)
    .slice(0, RECOMMEND_SAVIING_PRODUCTS_COUNT);

  return (
    <SavingsProducts
      products={recommendedProducts}
      selectedProduct={selectedProduct}
      onSelectProduct={onSelectProduct}
    />
  );
}

function orderByAnnualRateDesc(a: SavingProduct, b: SavingProduct) {
  if (a.annualRate === b.annualRate) {
    return orderByMinMonthlyAmountAsc(a, b);
  }

  return b.annualRate - a.annualRate;
}

function orderByMinMonthlyAmountAsc(a: SavingProduct, b: SavingProduct) {
  return a.minMonthlyAmount - b.minMonthlyAmount > 0 ? 1 : -1;
}
