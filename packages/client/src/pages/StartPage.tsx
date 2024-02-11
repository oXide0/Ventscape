import { Heading } from '@chakra-ui/react';
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    LineElement,
    LinearScale,
    PointElement,
    Title
} from 'chart.js';
import PageLayout from 'components/ui/PageLayout';
import faker from 'faker';
import { selectUser } from 'features/userSlice';
import { useAppSelector } from 'hooks/redux-hooks';
import { Line } from 'react-chartjs-2';
import { getGreeting } from 'utils/helpers';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Filler);

const StartPage = () => {
    const { name } = useAppSelector(selectUser);
    const greeting = name ? `${getGreeting()}, ${name}!` : `${getGreeting()}!`;

    return (
        <PageLayout>
            <Heading>{greeting}</Heading>
            <Line data={lineData} options={options} style={{ marginTop: 10 }} />
        </PageLayout>
    );
};

export default StartPage;

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const
        },
        title: {
            display: true,
            text: 'Your activity'
        }
    }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const lineData = {
    labels,
    datasets: [
        {
            fill: true,
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: '#6B72FF',
            backgroundColor: 'rgba(107, 114, 255, 0.5)'
        }
    ]
};
