import { useEffect } from 'react';

interface UseHandleBeforeUnloadParams {
    condition: boolean;
    onUnload: () => void;
}

const useHandleBeforeUnload = ({
    condition,
    onUnload,
}: UseHandleBeforeUnloadParams) => {
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (condition) {
                onUnload();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [condition, onUnload]);
};

export default useHandleBeforeUnload;
