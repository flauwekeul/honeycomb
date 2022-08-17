import { PreciseFormatter } from './precise-formatter';
export interface ModifiedFileConfig {
    fullPath: string;
    gitDirectoryParent: string;
    base: string | null;
    head: string | null;
    selectedFormatter: PreciseFormatter<any>;
}
export declare class ModifiedFile {
    private fullPath;
    private base;
    private head;
    private selectedFormatter;
    private gitDirectoryParent;
    fileContents: string;
    private formattedFileContents;
    private formatterConfig;
    private modifiedCharacterRanges;
    constructor({fullPath, gitDirectoryParent, base, head, selectedFormatter}: ModifiedFileConfig);
    isAlreadyFormatted(): boolean;
    hasValidFormattingForCharacterRanges(): boolean;
    formatCharacterRangesWithinContents(): void;
    shouldContentsBeUpdatedOnDisk(): boolean;
    updateFileOnDisk(): void;
    calculateModifiedCharacterRanges(): {
        err: Error | null;
    };
    private resolveFileContents();
    private resolveFormatterConfig();
}
