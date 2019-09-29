import asyncFetch from '../async-fetch';

describe('asyncFetch', () => {

    it('can fetch', async () => {
        const response = await asyncFetch('http://fake.com');

        expect(result).toEqual("something");
    });
});