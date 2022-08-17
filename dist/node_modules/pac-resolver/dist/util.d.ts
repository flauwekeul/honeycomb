/// <reference types="node" />
import { LookupAddress, LookupOptions } from 'dns';
import { GMT } from './index';
export declare function dnsLookup(host: string, opts: LookupOptions): Promise<string | LookupAddress[]>;
export declare function isGMT(v: any): v is GMT;
