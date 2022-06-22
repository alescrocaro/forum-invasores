const request = require('supertest');
const app = require('../server');

jest.setTimeout(10000);
afterAll(async () => {
  //await request(app).del('/usersDelete');
  //tem que fazer o delete de todos usuário para teste, se não
  //tem q ficar deletando todos dados da tabela a cada execução de teste
});

describe('Teste de criação do usuário', () => {
  //1
  it('Tudo preenchido, deve retornar status 200', async () => {
    const res = await request(app).post('/users').send({
      firstName: 'teste1',
      lastName: 'teste1',
      email: 'teste1@gmail.com',
      password: '123456',
      bio: ''
    });

    expect(res.statusCode).toBe(200);
  });

  //2
  it('Sem email, deve retornar status 401', async () => {
    const res = await request(app).post('/users').send({
      firstName: 'teste2',
      lastName: 'teste2',
      email: null,
      password: '123456',
      bio: ''
    });

    expect(res.statusCode).toBe(401);
  });

  //3
  it('Sem senha, deve retornar status 401', async () => {
    const res = await request(app).post('/users').send({
      firstName: 'teste3',
      lastName: 'teste3',
      email: 'teste@gmail.com',
      password: null,
      bio: ''
    });

    expect(res.statusCode).toBe(401);
  });

  //4
  it('Sem email e senha, deve retornar status 401', async () => {
    const res = await request(app).post('/users').send({
      firstName: 'teste4',
      lastName: 'teste4',
      email: null,
      password: null,
      bio: ''
    });

    expect(res.statusCode).toBe(401);
  });

  //5
  it('senha < 6 digitos, deve retornar status 401', async () => {
    const res = await request(app).post('/users').send({
      firstName: 'teste5',
      lastName: 'teste5',
      email: 'teste@gmail.com',
      password: '12345',
      bio: ''
    });

    expect(res.statusCode).toBe(401);
  });
});

describe('Teste de login do usuário', () => {
  //6
  it('Login com senha errada, deve retornar status 401', async () => {
    const res = await request(app).post('/login').send({
      email: 'teste1@gmail.com',
      password: 'abcdef'
    });

    expect(res.statusCode).toBe(401);
  });

  //7
  it('Login com email inexistente no banco, deve retornar status 401', async () => {
    const res = await request(app).post('/login').send({
      email: 'naoexiste@gmail.com',
      password: '123456'
    });

    expect(res.statusCode).toBe(401);
  });
});
