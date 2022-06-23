import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { generateColor } from 'utils/generateColor';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

type DataChart =
    | {
          category: string;
          price: number[];
          quantidadDeProdutos: number;
      }[]
    | undefined;

type Props = {
    dataChart: DataChart;
};

const BarComponent = ({ dataChart }: Props) => {
    const labels = dataChart?.map((category) => category.category);

    const dataBar = {
        labels,
        datasets: [
            {
                label: 'Maior Preço',
                data: dataChart?.map((product) => Math.max(...product.price)),
                backgroundColor: generateColor(0.7),
            },
            {
                label: 'Menor Preço',
                data: dataChart?.map((product) => Math.min(...product.price)),
                backgroundColor: generateColor(0.7),
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    return <Bar options={options} data={dataBar} />;
};

export default BarComponent;
