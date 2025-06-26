import { expect, test } from 'vitest';
import * as Example from '../';

test('Hello test', () => {
    const expected = 'Hello, world!';

    expect(Example.hello()).toEqual(expected);
});
