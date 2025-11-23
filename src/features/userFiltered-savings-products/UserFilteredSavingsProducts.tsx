import { useSavingsProductsQuery } from '../../api';
import { SavingProduct } from '../../common/type.ts';
import { SavingsProducts } from '../../common/SavingProducts.tsx';

interface SavingsProductsProps {
  selectedProduct: SavingProduct | null;
  onSelectProduct: (product: SavingProduct) => void;
  userFilter: {
    monthlyDeposit: number;
    depositPeriod: number;
  };
}

export function UserFilteredSavingsProducts({ selectedProduct, onSelectProduct, userFilter }: SavingsProductsProps) {
  const { data } = useSavingsProductsQuery();

  if (!data) {
    return null;
  }

  const isFilterOn = userFilter.monthlyDeposit > 0 && userFilter.depositPeriod > 0;
  const availableProduct = isFilterOn
    ? data.filter(product => filterByUserTarget({ ...product, ...userFilter }))
    : data;

  return (
    <>
      <SavingsProducts
        products={availableProduct}
        selectedProduct={selectedProduct}
        onSelectProduct={onSelectProduct}
      />
    </>
  );
}

/**
 * - 월 납입액
 *     - 최소 월 납입액보다 크고
 *     - 최대 월 납입액보다 작아야 함
 * - 저축 기간
 *     - 저축 기간과 동일해야 함
 */
function filterByUserTarget({
  minMonthlyAmount,
  maxMonthlyAmount,
  availableTerms,
  monthlyDeposit,
  depositPeriod,
}: {
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
  monthlyDeposit: number;
  depositPeriod: number;
}) {
  if (minMonthlyAmount > monthlyDeposit) {
    return false;
  }

  if (maxMonthlyAmount < monthlyDeposit) {
    return false;
  }

  if (availableTerms !== depositPeriod) {
    return false;
  }

  return true;
}
