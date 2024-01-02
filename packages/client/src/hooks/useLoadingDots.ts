import { useEffect, useState } from 'react';

export const useLoadingDots = () => {
    const [loadingMessage, setLoadingMessage] = useState('');

    useEffect(() => {
        let dotCount = 0;
        const interval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            const dots = '.'.repeat(dotCount);
            setLoadingMessage(dots);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return loadingMessage;
};
