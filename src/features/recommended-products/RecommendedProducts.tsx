import { useSavingsProductsQuery } from '../../api';
import { SavingProduct } from '../../common/type';
import { applyUserFilter, SavingsProducts, UserFilter } from '../../entities/SavingProducts';
import { RECOMMEND_SAVIING_PRODUCTS_COUNT } from './constants';

interface RecommendedProductsProps {
  selectedProduct: SavingProduct | null;
  onSelectProduct: (product: SavingProduct) => void;
  userFilter: UserFilter;
}

export function RecommendedProducts({ selectedProduct, onSelectProduct, userFilter }: RecommendedProductsProps) {
  const { data: products } = useSavingsProductsQuery();

  if (!products) {
    return null;
  }

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
  if (a.annualRate !== b.annualRate) {
    return b.annualRate - a.annualRate;
  }
  return a.minMonthlyAmount - b.minMonthlyAmount;
}
