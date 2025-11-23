import { Assets, colors, ListRow } from 'tosslib';

interface SavingsProductsProps {
  selectedProduct: string | null;
  onSelectProduct: (product: unknown) => void;
}

export function SavingsProducts({ selectedProduct, onSelectProduct }: SavingsProductsProps) {
  // TODO: 구현필요
  const isSelected = selectedProduct === '1';

  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={'기본 정기적금'}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={'연 이자율: 3.2%'}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={'100,000원 ~ 500,000원 | 12개월'}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        right={isSelected && <Assets.Icon name="icon-check-circle-green" />}
        onClick={() => onSelectProduct(1)}
      />

      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={'고급 정기적금'}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={'연 이자율: 2.8%'}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={'50,000원 ~ 1,000,000원 | 24개월'}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        onClick={() => onSelectProduct(1)}
      />
    </>
  );
}
