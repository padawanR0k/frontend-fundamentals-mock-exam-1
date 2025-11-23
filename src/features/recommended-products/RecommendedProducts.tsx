import { SavingsProducts } from '../../entities/SavingProducts';
import { useSavingsProductsQuery } from '../../api';
import { SavingProduct } from '../../common/type';
import { RECOMMEND_SAVIING_PRODUCTS_COUNT } from './constants';

interface RecommendedProductsProps {
  selectedProduct: SavingProduct | null;
  onSelectProduct: (product: SavingProduct) => void;
}

export function RecommendedProducts({ selectedProduct, onSelectProduct }: RecommendedProductsProps) {
  const { data: products } = useSavingsProductsQuery();

  if (!products) {
    return null;
  }

  const orderedProducts = products.sort(orderByAnnualRateDesc);
  const recommendedProducts = orderedProducts.slice(0, RECOMMEND_SAVIING_PRODUCTS_COUNT);

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
