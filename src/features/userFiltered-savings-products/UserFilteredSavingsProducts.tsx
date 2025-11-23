import { useSavingsProductsQuery } from '../../api';
import { SavingProduct } from '../../common/type.ts';
import { applyUserFilter, SavingsProducts } from '../../entities/SavingProducts';

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

  const availableProduct = applyUserFilter(data, userFilter);

  return (
    <SavingsProducts
      products={availableProduct}
      selectedProduct={selectedProduct}
      onSelectProduct={onSelectProduct}
    />
  );
}
