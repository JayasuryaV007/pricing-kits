import { ConvertToUSD } from './convert-to-usd';

interface DataType {
  id: string;
  user_id: string;
  service_name: string;
  plan_name: string;
  price: string | null;
  billing_cycle: string;
  next_billing_date: string;
  start_date: string;
  created_at: string;
  status: string | null;
  type: string | null;
}

interface MonthlyStats {
  count: number;
  cost: number;
}

type MonthlyData = {
  [key: string]: MonthlyStats;
};

function getMonthName(date: Date): string {
  return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
}

function getMonthsInRange(startDate: Date, endDate: Date): string[] {
  const months = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const monthName = getMonthName(currentDate);
    months.push(monthName);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
}

const getMonthRange = (start: Date, end: Date) => {
  const months = [];
  const current = new Date(start);

  while (current <= end) {
    months.push(
      current.toLocaleString('default', { month: 'long', year: 'numeric' }),
    );
    current.setMonth(current.getMonth() + 1);
    current.setDate(1);
  }

  return months;
};

export function subscriptionAnalysis(
  subscriptions: DataType[],
  startDate: string,
  endDate: string,
) {
  const monthlyData: MonthlyData = getMonthRange(
    new Date(startDate),
    new Date(endDate),
  ).reduce((acc, month) => {
    acc[month] = { count: 0, cost: 0 };
    return acc;
  }, {} as MonthlyData);

  subscriptions.forEach((subscription) => {
    const startDateParts = subscription.start_date?.split('-').map(Number);
    const endDateParts = subscription.next_billing_date?.split('-').map(Number);

    const startDate = new Date(
      startDateParts[2],
      startDateParts[1] - 1,
      startDateParts[0],
    );
    const endDate = new Date(
      endDateParts[2],
      endDateParts[1] - 1,
      endDateParts[0],
    );

    const coveredMonths = getMonthsInRange(startDate, endDate);
    let price = parseFloat(subscription.price || '0');

    coveredMonths.forEach((monthName) => {
      if (monthlyData[monthName]) {
        monthlyData[monthName].count += 1;
        monthlyData[monthName].cost += price;
      }
    });
  });
  const months = Object.keys(monthlyData);
  const totalSubscriptions = months.map(
    (month: string) => monthlyData[month].count,
  );
  const totalExpenses = months.map((month: string) =>
    ConvertToUSD(monthlyData[month].cost).toFixed(2),
  );
  return { months, totalSubscriptions, totalExpenses };
}
