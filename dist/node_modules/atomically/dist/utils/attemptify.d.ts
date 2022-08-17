import { Exception, FN } from '../types';
declare const attemptifyAsync: <T extends FN<any[], any>>(fn: T, onError?: FN<[Exception]>) => T;
declare const attemptifySync: <T extends FN<any[], any>>(fn: T, onError?: FN<[Exception]>) => T;
export { attemptifyAsync, attemptifySync };
