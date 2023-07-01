import { boolean, number, object, optional, string, unionAll } from '../src/structs';
import { expectErr, expectOk } from './test-util';

const structA = object({
    a: number('a'),
});

const structB = object({
    b: string('b error'),
    c: optional(boolean('c')),
});

const struct = unionAll([structA, structB]);

it('returns err if the input is not the same struct', () =>
    expectErr(struct({ a: 1 }), 'Expecting all of the specified structs'));

it('returns ok if the input is the same struct', () =>
    expectOk(struct({ a: 1, b: '2', c: true }), { a: 1, b: '2', c: true }));