/// <reference types="node" />
declare const RetryfyQueue: {
    interval: number;
    intervalId: NodeJS.Timeout | undefined;
    limit: number;
    queueActive: Set<Function>;
    queueWaiting: Set<Function>;
    init: () => void;
    reset: () => void;
    add: (fn: Function) => void;
    remove: (fn: Function) => void;
    schedule: () => Promise<Function>;
    tick: () => void;
};
export default RetryfyQueue;
