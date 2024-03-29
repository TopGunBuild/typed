import { Enum, Struct } from '../types';
import { StructError } from '../error';
import { err, isNull, isUndefined, ok } from '../util';

/**
 * Creates a new struct that accepts a enum.
 */
export const enums = <T extends Enum>(
    e: T,
    msg?: string,
): Struct<T[keyof T]> =>
{
    const values = Object.values(e);
    if (isNull(msg) || isUndefined(msg))
    {
        msg = `Expecting one of ${values.join(', ')}`;
    }
    return input =>
        values.includes(input)
            ? ok(input)
            : err(new StructError(msg as string, { input, path: [] }));
};
