import { Tabs } from 'common/Tabs';
import { Border, NavigationBar, SelectBottomSheet, Spacing, TextField } from 'tosslib';
import { SavingsCalculator } from '../features/savings-calculator/SavingCalculator';
import { useState } from 'react';
import { SavingsProducts } from '../features/savings-products/SavingProducts.tsx';

export function SavingsCalculatorPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleSelectProduct = (product: unknown) => {
    // TODO: 구현필요
    setSelectedProduct(product as string);
  };

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField label="목표 금액" placeholder="목표 금액을 입력하세요" suffix="원" />
      <Spacing size={16} />
      <TextField label="월 납입액" placeholder="희망 월 납입액을 입력하세요" suffix="원" />
      <Spacing size={16} />
      <SelectBottomSheet label="저축 기간" title="저축 기간을 선택해주세요" value={12} onChange={() => {}}>
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
          <SavingsProducts onSelectProduct={handleSelectProduct} selectedProduct={selectedProduct} />
        </Tabs.Panel>
        <Tabs.Panel value="results">
          <SavingsCalculator monthlyDeposit={1} depositPeriod={1} targetAmount={1} yearlyInterestRate={1} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
