import { useEffect, useState } from 'react';
import { LostClosedStatusId, UnqualifiedStatusId } from '../../../../constants/sales-status'

const useDefaultStatus = (stageId = 10) => {
    const [status, setStatus] = useState(UnqualifiedStatusId);

    useEffect(() => {
        if(stageId === 10) {
            setStatus(UnqualifiedStatusId)
        }
        else {
            setStatus(LostClosedStatusId)
        }
    }, [setStatus, stageId])

    return status;
}

export {
    useDefaultStatus
}