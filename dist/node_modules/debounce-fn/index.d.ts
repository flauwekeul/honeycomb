declare namespace debounceFn {
	interface Options {
		/**
		Time to wait until the `input` function is called.

		@default 0
		*/
		readonly wait?: number;

		/**
		Trigger the function on the leading edge of the `wait` interval.

		For example, this can be useful for preventing accidental double-clicks on a "submit" button from firing a second time.

		@default false
		*/
		readonly before?: boolean;

		/**
		Trigger the function on the trailing edge of the `wait` interval.

		@default true
		*/
		readonly after?: boolean;
	}

	interface BeforeOptions extends Options {
		readonly before: true;
	}

	interface NoBeforeNoAfterOptions extends Options {
		readonly after: false;
		readonly before?: false;
	}

	interface DebouncedFunction<ArgumentsType extends unknown[], ReturnType> {
		(...arguments: ArgumentsType): ReturnType;
		cancel(): void;
	}
}

/**
[Debounce](https://davidwalsh.name/javascript-debounce-function) a function.

@param input - Function to debounce.
@returns A debounced function that delays calling the `input` function until after `wait` milliseconds have elapsed since the last time the debounced function was called.

It comes with a `.cancel()` method to cancel any scheduled `input` function calls.

@example
```
import debounceFn = require('debounce-fn');

window.onresize = debounceFn(() => {
	// Do something on window resize
}, {wait: 100});
```
*/
declare function debounceFn<ArgumentsType extends unknown[], ReturnType>(
	input: (...arguments: ArgumentsType) => ReturnType,
	options: debounceFn.BeforeOptions
): debounceFn.DebouncedFunction<ArgumentsType, ReturnType>;

declare function debounceFn<ArgumentsType extends unknown[], ReturnType>(
	input: (...arguments: ArgumentsType) => ReturnType,
	options: debounceFn.NoBeforeNoAfterOptions
): debounceFn.DebouncedFunction<ArgumentsType, undefined>;

declare function debounceFn<ArgumentsType extends unknown[], ReturnType>(
	input: (...arguments: ArgumentsType) => ReturnType,
	options?: debounceFn.Options
): debounceFn.DebouncedFunction<ArgumentsType, ReturnType | undefined>;

export = debounceFn;
