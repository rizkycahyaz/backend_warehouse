const request = require('supertest');
const app = require('../app'); // Asumsikan server berada di app.js

describe('Item Controller', () => {
  let token;

  beforeAll(async () => {
    // Login dan dapatkan token autentikasi
    const res = await request(app).post('/api/auth/login').send({ email: 'admin@test.com', password: 'password' });
    token = res.body.token;
  });

  it('should create a new item', async () => {
    const res = await request(app)
      .post('/api/items/create')
      .set('Authorization', token)
      .send({ lot_batch_no: '12345', part_no: 'PN123', description: 'Test Item', qty: 10, unit: 'pcs', location_id: 1, photo: 'url_to_photo' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('Item created successfully');
  });

  it('should get all items', async () => {
    const res = await request(app).get('/api/items').set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should update an item', async () => {
    const res = await request(app)
      .put('/api/items/12345')
      .set('Authorization', token)
      .send({ qty: 20 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Item updated successfully');
  });

  it('should delete an item', async () => {
    const res = await request(app).delete('/api/items/12345').set('Authorization', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Item deleted successfully');
  });
});