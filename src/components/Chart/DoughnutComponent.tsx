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
import { Doughnut } from 'react-chartjs-2';
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

const DoughnutComponent = ({ dataChart }: Props) => {
    const dataDoughnut = {
        labels: dataChart?.map((category: any) => category.category),

        datasets: [
            {
                label: 'Categorias/Produtos',

                data: dataChart?.map(
                    (quantidadDeProdutos: any) => quantidadDeProdutos.quantidadDeProdutos
                ),

                backgroundColor: dataChart?.map((category: any) => generateColor(0.7)),
                hoverOffset: 4,
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
                text: 'Quantidades de produtos por categoria',
            },
        },
    };
    return <Doughnut options={options} data={dataDoughnut} />;
};

export default DoughnutComponent;
