import { Suspense } from 'react';
import { Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { Loading } from '../../common/Loading';
import { SavingProduct } from '../../common/type';
import { UserFilter } from '../../entities/SavingProducts';
import { RecommendedProducts } from '../recommended-products/RecommendedProducts';

interface SavingsCalculatorProps {
  selectedProduct: SavingProduct | null;
  targetAmount: number;
  onSelectProduct: (product: SavingProduct) => void;
  userFilter: UserFilter;
}

export function SavingsCalculatorResult({
  selectedProduct,
  targetAmount,
  onSelectProduct,
  userFilter,
}: SavingsCalculatorProps) {
  return (
    <>
      <Spacing size={8} />
      {selectedProduct ? (
        <SavingsCalculatorResultContents
          monthlyDeposit={userFilter.monthlyDeposit}
          depositPeriod={userFilter.depositPeriod}
          targetAmount={targetAmount}
          annualRate={selectedProduct.annualRate}
        />
      ) : (
        <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />
      )}

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <Suspense fallback={<Loading />}>
        <RecommendedProducts
          selectedProduct={selectedProduct}
          onSelectProduct={onSelectProduct}
          userFilter={userFilter}
        />
      </Suspense>

      <Spacing size={40} />
    </>
  );
}

const 추천월납입금액_반올림위치 = 1000;

function SavingsCalculatorResultContents({
  monthlyDeposit,
  depositPeriod,
  targetAmount,
  annualRate,
}: {
  monthlyDeposit: number;
  depositPeriod: number;
  targetAmount: number;
  annualRate: number;
}) {
  const 예상이자율 = depositPeriod * (1 + annualRate / 100 * 0.5);
  const 예상수입금액 = monthlyDeposit * 예상이자율;
  const 목표금액과의차이 = targetAmount - 예상수입금액;
  const 추천월납입금액 = Math.round(targetAmount / 예상이자율 / 추천월납입금액_반올림위치) * 추천월납입금액_반올림위치;
  return (
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
  );
}
