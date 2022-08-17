import { RepositoryType } from "../../models";
export declare const gitIsInstalled: boolean;
/**
 * Stores data of a repository.
 */
export declare class Repository {
    /**
     * The root path of this repository.
     */
    path: string;
    /**
     * The name of the branch this repository is on right now.
     */
    branch: string;
    /**
     * A list of all files tracked by the repository.
     */
    files: string[];
    /**
     * The user/organization name of this repository on GitHub.
     */
    user?: string;
    /**
     * The project name of this repository on GitHub.
     */
    project?: string;
    /**
     * The hostname for this GitHub/Bitbucket/.etc project.
     *
     * Defaults to: `github.com` (for normal, public GitHub instance projects)
     *
     * Can be the hostname for an enterprise version of GitHub, e.g. `github.acme.com`
     * (if found as a match in the list of git remotes).
     */
    hostname: string;
    /**
     * Whether this is a GitHub, Bitbucket, or other type of repository.
     */
    type: RepositoryType;
    private urlCache;
    /**
     * Create a new Repository instance.
     *
     * @param path  The root path of the repository.
     */
    constructor(path: string, gitRevision: string, repoLinks: string[]);
    /**
     * Check whether the given file is tracked by this repository.
     *
     * @param fileName  The name of the file to test for.
     * @returns TRUE when the file is part of the repository, otherwise FALSE.
     */
    contains(fileName: string): boolean;
    /**
     * Get the URL of the given file on GitHub or Bitbucket.
     *
     * @param fileName  The file whose URL should be determined.
     * @returns A URL pointing to the web preview of the given file or undefined.
     */
    getURL(fileName: string): string | undefined;
    getLineNumberAnchor(lineNumber: number): string;
    /**
     * Try to create a new repository instance.
     *
     * Checks whether the given path is the root of a valid repository and if so
     * creates a new instance of {@link Repository}.
     *
     * @param path  The potential repository root.
     * @returns A new instance of {@link Repository} or undefined.
     */
    static tryCreateRepository(path: string, gitRevision: string, gitRemote: string): Repository | undefined;
}
