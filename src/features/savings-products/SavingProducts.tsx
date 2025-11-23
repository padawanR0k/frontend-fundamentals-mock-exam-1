import { Assets, colors, ListRow } from 'tosslib';
import { useSavingsProductsQuery } from '../../api.ts';

interface SavingsProductsProps {
  selectedProduct: string | null;
  onSelectProduct: (product: unknown) => void;
}

export function SavingsProducts({ selectedProduct, onSelectProduct }: SavingsProductsProps) {
  const { data } = useSavingsProductsQuery();
  // TODO: 구현필요
  const isSelected = selectedProduct === '1';

  if (!data) {
    return null;
  }

  return (
    <>
      {data.map(product => (
        <ListRow
          key={product.id}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={product.name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${product.annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.annualRate}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          right={isSelected && <Assets.Icon name="icon-check-circle-green" />}
          onClick={() => onSelectProduct(1)}
        />
      ))}
    </>
  );
}
