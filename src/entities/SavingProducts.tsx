import { Assets, colors, ListRow } from 'tosslib';
import { SavingProduct } from './type';

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
