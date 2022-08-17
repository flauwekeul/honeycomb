/// <reference types="node" />
import { Callback, Data, Path, ReadOptions, WriteOptions } from './types';
declare function readFile(filePath: Path, options: string | ReadOptions & {
    encoding: string;
}): Promise<string>;
declare function readFile(filePath: Path, options?: ReadOptions): Promise<Buffer>;
declare function readFileSync(filePath: Path, options: string | ReadOptions & {
    encoding: string;
}): string;
declare function readFileSync(filePath: Path, options?: ReadOptions): Buffer;
declare const writeFile: (filePath: Path, data: Data, options?: string | WriteOptions | Callback | undefined, callback?: Callback | undefined) => Promise<void>;
declare const writeFileSync: (filePath: Path, data: Data, options?: string | WriteOptions) => void;
export { readFile, readFileSync, writeFile, writeFileSync };
