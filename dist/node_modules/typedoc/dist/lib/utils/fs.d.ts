/**
 * Get the longest directory path common to all files.
 */
export declare function getCommonDirectory(files: readonly string[]): string;
/**
 * Normalize the given path.
 *
 * @param path  The path that should be normalized.
 * @returns The normalized path.
 */
export declare function normalizePath(path: string): string;
/**
 * Load the given file and return its contents.
 *
 * @param file  The path of the file to read.
 * @returns The files contents.
 */
export declare function readFile(file: string): string;
/**
 * Write a file to disc.
 *
 * If the containing directory does not exist it will be created.
 *
 * @param fileName  The name of the file that should be written.
 * @param data  The contents of the file.
 */
export declare function writeFileSync(fileName: string, data: string): void;
/**
 * Write a file to disc.
 *
 * If the containing directory does not exist it will be created.
 *
 * @param fileName  The name of the file that should be written.
 * @param data  The contents of the file.
 */
export declare function writeFile(fileName: string, data: string): Promise<void>;
/**
 * Copy a file or directory recursively.
 */
export declare function copy(src: string, dest: string): Promise<void>;
export declare function copySync(src: string, dest: string): void;
/**
 * Simpler version of `glob.sync` that only covers our use cases, always ignoring node_modules.
 */
export declare function glob(pattern: string, root: string, options?: {
    includeDirectories?: boolean;
}): string[];
