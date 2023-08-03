import request from 'supertest';
import app from '../index';

describe('GET /fib', () => {
  it('HTTP400: クエリーが空の場合', async () => {
    const res = await request(app).get('/fib');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Query parameter is required');
  });
  it('HTTP400: クエリーが正数でない', async () => {
    const res = await request(app).get('/fib').query({ n: -1 });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Number must be positive');
  });
  it('HTTP400: クエリーが整数でない', async () => {
    const res = await request(app).get('/fib').query({ n: 1.5 });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('status');
    expect(res.body.status).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Number must be integer');
  });
  it('HTTP200: n=1 正常', async () => {
    const res = await request(app).get('/fib').query({ n: 1 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result');
    expect(res.body.message).toEqual(1);
  });
  it('HTTP200: n=2 正常', async () => {
    const res = await request(app).get('/fib').query({ n: 2 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result');
    expect(res.body.message).toEqual(2);
  });
  it('HTTP200: n=10 正常', async () => {
    const res = await request(app).get('/fib').query({ n: 10 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result');
    expect(res.body.message).toEqual(55);
  });
  it('HTTP200: n=99 正常', async () => {
    const res = await request(app).get('/fib').query({ n: 99 });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result');
    expect(res.body.message).toEqual(218922995834555169026n);
  });
});
