import { SavingProduct } from '../../common/type.ts';
import { applyUserFilter, SavingsProducts } from '../../entities/SavingProducts';

interface SavingsProductsProps {
  products: SavingProduct[];
  selectedProduct: SavingProduct | null;
  onSelectProduct: (product: SavingProduct) => void;
  userFilter: {
    monthlyDeposit: number;
    depositPeriod: number;
  };
}

export function UserFilteredSavingsProducts({ products, selectedProduct, onSelectProduct, userFilter }: SavingsProductsProps) {
  const availableProduct = applyUserFilter(products, userFilter);

  return (
    <SavingsProducts
      products={availableProduct}
      selectedProduct={selectedProduct}
      onSelectProduct={onSelectProduct}
    />
  );
}
