import { Infer, InferTuple, Struct } from '../types';
import { StructError } from '../error';
import { err, isErr, ok } from '../util';

/**
 * Creates a new struct that accepts any of the given structs.
 * It behaves like a union type: A | B | C.
 */
export const unionAll = <A extends Struct, B extends Struct[]>(
    structs: [A, ...B],
    msg = 'Expecting all of the specified structs',
): Struct<Infer<A>|InferTuple<B>[number]> =>
{
    return (input) =>
    {
        for (const struct of structs)
        {
            const result = struct(input);
            if (isErr(result)) return err(new StructError(msg, { input, path: [] }));
        }
        return ok(input);
    };
};
