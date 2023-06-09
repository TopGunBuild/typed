import { Struct } from '../types';
import { StructError } from '../error';
import { err, isFunction, ok } from '../util';

/**
 * Creates a new struct that accepts a function.
 */
export const fn =
    (msg = 'Expecting function'): Struct<(...args: any[]) => any> =>
        (input) =>
            isFunction(input)
                ? ok(input)
                : err(new StructError(msg, { input, path: [] }));

/*const safeFn: (...args: any[]) => any = input => input;

/!**
 * Creates a new struct that will try to parse the input as a function.
 *!/
export const asFunction = (msg?: string): Struct<(...args: any[]) => any> =>
{
    const _fn = fn(msg);
    return (input) => (isFunction(input) ? _fn(input) : _fn(safeFn));
};*/
