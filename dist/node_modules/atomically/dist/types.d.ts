/// <reference types="node" />
declare type Callback = (error: Exception | void) => any;
declare type Data = Buffer | string | undefined;
declare type Disposer = () => void;
declare type Exception = NodeJS.ErrnoException;
declare type FN<Arguments extends any[] = any[], Return = any> = (...args: Arguments) => Return;
declare type Path = string;
declare type ReadOptions = {
    encoding?: string | null;
    mode?: string | number | false;
    timeout?: number;
};
declare type WriteOptions = {
    chown?: {
        gid: number;
        uid: number;
    } | false;
    encoding?: string | null;
    fsync?: boolean;
    fsyncWait?: boolean;
    mode?: string | number | false;
    schedule?: (filePath: string) => Promise<Disposer>;
    timeout?: number;
    tmpCreate?: (filePath: string) => string;
    tmpCreated?: (filePath: string) => any;
    tmpPurge?: boolean;
};
export { Callback, Data, Disposer, Exception, FN, Path, ReadOptions, WriteOptions };
