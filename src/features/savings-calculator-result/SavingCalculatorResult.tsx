import { Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { SavingProduct } from '../../common/type';
import { RecommendedProducts } from '../recommended-products/RecommendedProducts';

interface SavingsCalculatorProps {
  monthlyDeposit: number;
  depositPeriod: number;
  targetAmount: number;

  yearlyInterestRate: number;
  isSavingProductSelected: boolean;

  selectedProduct: SavingProduct | null;
  onSelectProduct: (product: SavingProduct) => void;
}

export function SavingsCalculatorResult({
  monthlyDeposit,
  depositPeriod,
  targetAmount,
  yearlyInterestRate,
  isSavingProductSelected,
  selectedProduct,
  onSelectProduct,
}: SavingsCalculatorProps) {
  const 예상수입금액 = monthlyDeposit * depositPeriod * (1 + yearlyInterestRate * 0.5);
  const 목표금액과의차이 = targetAmount - 예상수입금액;
  const 추천월납입금액 = Math.round(targetAmount / (depositPeriod * (1 + yearlyInterestRate * 0.5)) / 1000) * 1000;

  return (
    <>
      <Spacing size={8} />
      {isSavingProductSelected ? (
        <>
          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="예상 수익 금액"
                topProps={{ color: colors.grey600 }}
                bottom={`${예상수입금액.toLocaleString()}원`}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="목표 금액과의 차이"
                topProps={{ color: colors.grey600 }}
                bottom={`${목표금액과의차이.toLocaleString()}원`}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="추천 월 납입 금액"
                topProps={{ color: colors.grey600 }}
                bottom={`${추천월납입금액.toLocaleString()}원`}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
        </>
      ) : (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
      )}

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <RecommendedProducts selectedProduct={selectedProduct} onSelectProduct={onSelectProduct} />

      <Spacing size={40} />
    </>
  );
}
