export declare function resolveNearestGitDirectoryParent(workingDirectory: string): string;
export declare function getDiffForFile(gitDirectoryParent: string, fullPath: string, base: string | null, head: string | null): string;
export declare function getModifiedFilenames(gitDirectoryParent: string, base: string | null, head: string | null): string[];
