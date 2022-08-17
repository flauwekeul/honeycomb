export declare type ProcessingStatus = 'NOT_UPDATED' | 'UPDATED' | 'INVALID_FORMATTING';
export interface AdditionalOptions {
    checkOnly: boolean;
    filesWhitelist: string[] | null;
    base: string | null;
    head: string | null;
}
export interface Callbacks {
    onInit(workingDirectory: string): void;
    onModifiedFilesDetected(modifiedFilenames: string[]): void;
    onBegunProcessingFile(filename: string, index: number, totalFiles: number): void;
    onFinishedProcessingFile(filename: string, index: number, status: ProcessingStatus): void;
    onError(err: Error): void;
    onComplete(totalFiles: number): void;
}
export declare function main(workingDirectory: string, additionalOptions: AdditionalOptions, callbacks?: Callbacks): void;
