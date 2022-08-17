declare const Lang: {
    isFunction: (x: any) => x is Function;
    isString: (x: any) => x is string;
    isUndefined: (x: any) => x is undefined;
};
export default Lang;
