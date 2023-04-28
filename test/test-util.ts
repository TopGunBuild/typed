import { StructError, StructErrorInfo } from '../src/error';


export function expectOk(actual: any, expected: any)
{
    expect(actual).toEqual({ ok: true, value: expected });
}

export function expectErr(
    actual: any,
    message: string,
    info?: StructErrorInfo,
)
{
    expect(actual.ok).toBe(false);
    expect(actual.error).toBeInstanceOf(StructError);
    expect(actual.error.message).toEqual(message);
    if (info)
    {
        expect(actual.error.info).toEqual(expect.objectContaining(info));
    }
}

export function generateMessageId(): string
{
    return Math.random()
        .toString(36)
        .slice(2)
}

export function pseudoRandomText(
    l = 24,
    c = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz'
): string
{
    let s = '';
    while (l > 0)
    {
        s += c.charAt(Math.floor(Math.random() * c.length));
        l--
    }
    return s
}
