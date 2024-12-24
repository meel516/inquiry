import { useCallback, useState } from 'react';
import { SalesAPIService } from '../../../services/SalesServices';

const salesService = new SalesAPIService();

export const useDragHandlers = () => {
    // eslint-disable-next-line
    const [ _, setActiveDrags ] = useState(0);

    const onStart = useCallback(() => {
        setActiveDrags(x => x + 1);
    }, []);

    const onStop = useCallback(() => {
        setActiveDrags(x => x - 1);
    }, []);

    return [ onStart, onStop ];
}
export const useRowGetter = (rows = []) => {
    return useCallback(i => (rows[i] || {}), [rows]);
  };

export const useSalesService = () => {
    return salesService;
}