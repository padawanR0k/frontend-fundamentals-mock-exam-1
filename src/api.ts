import { useQuery } from '@tanstack/react-query';
import { http } from 'tosslib';

const API_ENDPOINT = {
  SAVINGS_PRODUCTS: '/api/savings-products',
};

const queryKeys = {
  savingsProducts: 'savingsProducts',
};

export const useSavingsProductsQuery = () => {
  return useQuery<SavingsProductQueryResponse[]>({
    queryFn: async () => http.get(API_ENDPOINT.SAVINGS_PRODUCTS),
    queryKey: [queryKeys.savingsProducts],
  });
};

interface SavingsProductQueryResponse {
  id: string;
  name: string;
  annualRate: number;
  minMonthlyAmount: number;
  maxMonthlyAmount: number;
  availableTerms: number;
}
