import { fn } from '../src/structs';
import { expectErr, expectOk } from './test-util';

const struct = fn('test');

describe('.function()', () =>
{
    it('has default error', () =>
        expectErr(fn()(undefined), 'Expecting function', {
            input: undefined,
            path : [],
        }));

    it('returns err if input is not a function', () =>
        expectErr(struct(null), 'test', { input: null, path: [] }));

    it('returns ok if input is a function and it is valid', () =>
    {
        const struct = fn('test');
        const value  = () => {};
        expectOk(struct(value), value);
    });
});