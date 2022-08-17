import { CharacterRange } from './utils';
export interface PreciseFormatter<FormatterConfig> {
    resolveConfig(modifiedFilePath: string): FormatterConfig | null;
    isAlreadyFormatted(fileContents: string, formatterConfig: FormatterConfig | null): boolean;
    checkFormattingOfRanges(fileContents: string, config: FormatterConfig | null, characterRanges: CharacterRange[]): boolean;
    formatRanges(fileContents: string, config: FormatterConfig | null, characterRanges: CharacterRange[]): string;
    generateIgnoreFilePredicate(workingDirectory: string): (filename: string) => boolean;
    hasSupportedFileExtension(filename: string): boolean;
}
