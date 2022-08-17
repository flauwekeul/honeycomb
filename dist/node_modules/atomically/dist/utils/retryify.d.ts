import { Exception, FN } from '../types';
declare const retryifyAsync: <T extends FN<any[], any>>(fn: T, isRetriableError: FN<[Exception], boolean | void>) => FN<[number], T>;
declare const retryifySync: <T extends FN<any[], any>>(fn: T, isRetriableError: FN<[Exception], boolean | void>) => FN<[number], T>;
export { retryifyAsync, retryifySync };
