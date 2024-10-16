// Utility function to create an array of a given length
const range = (len: number): number[] => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// Interface for Highcharts data structure
interface HighchartsData {
  chart: {
    type: string;
  };
  title: {
    text: string;
  };
  xAxis: {
    categories: string[];
    title?: {
      text: string;
    };
  };
  legend: {
    enabled: boolean;
  };
  series: Array<{
    data: number[];
  }>;
}

interface DataType {
  id: string;
  user_id: string;
  service_name: string;
  plan_name: string;
  price: string | null;
  billing_cycle: string;
  next_billing_date: string;
  created_at: string;
  status: string | null;
  type: string | null;
}

// Function to create a new person object with a Highcharts data structure
const newPerson = (): { progress: HighchartsData } => {
  return {
    progress: makeHighchartData(),
  };
};

// Main function to generate hierarchical data
export default function data(
  ...lens: number[]
  // ...subscriptions: DataType[]
): any[] {
  const makeDataLevel = (depth: number = 0): any[] => {
    const len = lens[depth];
    return range(len).map(() => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

// Function to generate random Highcharts data
function makeHighchartData(): HighchartsData {
  let highchartsData: HighchartsData = {
    chart: {
      type: 'line',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    legend: {
      enabled: true,
    },
    series: [],
  };
  const names = ['Total Subscriptions', 'Total Expenses'];
  const colors = ['limegreen', 'skyblue'];

  for (let i = 0; i < 2; i++) {
    let seriesData = {
      name: names[i],
      data: [
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 1000),
        Math.floor(Math.random() * 100),
      ],
      color: colors[i],
    };
    highchartsData.series.push(seriesData);
  }

  return highchartsData;
}
