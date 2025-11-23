import { NumberField } from 'common/NumberField';
import { Tabs } from 'common/Tabs';
import { useState } from 'react';
import { Border, NavigationBar, SelectBottomSheet, Spacing } from 'tosslib';
import { SavingProduct } from '../common/type.ts';
import { SavingsCalculatorResult } from '../features/savings-calculator-result/SavingCalculatorResult';
import { UserFilteredSavingsProducts } from '../features/userFiltered-savings-products/UserFilteredSavingsProducts';

export function SavingsCalculatorPage() {
  const [selectedProduct, setSelectedProduct] = useState<SavingProduct | null>(null);

  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(0);
  const [depositPeriod, setDepositPeriod] = useState<number>(0);

  const userFilter = {
    monthlyDeposit,
    depositPeriod,
  };

  const handleSelectProduct = (product: SavingProduct) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <NumberField
        onChange={setTargetAmount}
        value={targetAmount}
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
      />
      <Spacing size={16} />
      <NumberField
        onChange={setMonthlyDeposit}
        value={monthlyDeposit}
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
      />
      <Spacing size={16} />
      <SelectBottomSheet
        value={depositPeriod}
        onChange={setDepositPeriod}
        label="저축 기간"
        title="저축 기간을 선택해주세요"
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tabs
        defaultValue="products"
        tabKeys={[
          {
            value: 'products',
            label: '적금 상품',
          },
          {
            value: 'results',
            label: '계산 결과',
          },
        ]}
      >
        <Tabs.Panel value="products">
          <UserFilteredSavingsProducts
            onSelectProduct={handleSelectProduct}
            selectedProduct={selectedProduct}
            userFilter={userFilter}
          />
        </Tabs.Panel>
        <Tabs.Panel value="results">
          <SavingsCalculatorResult
            onSelectProduct={handleSelectProduct}
            selectedProduct={selectedProduct}
            targetAmount={targetAmount}
            userFilter={userFilter}
          />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
