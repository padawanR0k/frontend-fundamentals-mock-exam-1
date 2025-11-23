import { Assets, colors, ListRow } from 'tosslib';
import { useSavingsProductsQuery } from '../../api';
import { SavingProduct } from '../../common/type';

interface SavingsProductsProps {
  selectedProduct: SavingProduct | null;
  onSelectProduct: (product: SavingProduct) => void;
  userTarget: {
    monthlyDeposit: number;
    depositPeriod: number;
  };
}

export function SavingsProducts({ selectedProduct, onSelectProduct, userTarget }: SavingsProductsProps) {
  const { data } = useSavingsProductsQuery();

  if (!data) {
    return null;
  }

  const isFilterOn = userTarget.monthlyDeposit > 0 && userTarget.depositPeriod > 0;
  const availableProduct = isFilterOn ? data.filter(product => filterByUserTarget(product, userTarget)) : data;

  return (
    <>
      {availableProduct.map(product => {
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

/**
 * - 월 납입액
 *     - `product.minMonthlyAmount` (최소 월 납입액)보다 크고
 *     - `product.maxMonthlyAmount` (최대 월 납입액)보다 작아야 함
 * - 저축 기간
 *     - `product.availableTerms` (저축 기간)와 동일해야 함
 */
function filterByUserTarget(product: SavingProduct, userTarget: { monthlyDeposit: number; depositPeriod: number }) {
  if (product.minMonthlyAmount > userTarget.monthlyDeposit) {
    return false;
  }

  if (product.maxMonthlyAmount < userTarget.monthlyDeposit) {
    return false;
  }

  if (product.availableTerms !== userTarget.depositPeriod) {
    return false;
  }

  return true;
}
