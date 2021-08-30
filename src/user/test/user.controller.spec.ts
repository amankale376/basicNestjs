import { Test } from '@nestjs/testing';
import { User } from '../user.entity';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import {
  loginStub,
  retrunListUsersStub,
  signupReturnStub,
  signupStub,
  UserReturnStub,
} from './stubs/user.stub';
import { AppModule } from '../../app.module';
import { DatabaseService } from '../../database/database.service';
import * as request from 'supertest';

describe('UserController', () => {
  let UserDbConnection: Repository<User>;
  // let SocketsDbConnection: Repository<Sockets>;
  let httpServer: any;
  let app: any;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [],
      providers: [],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
    UserDbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getUserDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('signup', () => {
    it('should return an user', async () => {
      const response = await request(httpServer)
        .post('/signup')
        .send(signupStub());
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(signupReturnStub());
    });
  });
  describe('login', () => {
    it('should return a token', async () => {
      // await UserDbConnection.save(signupStub())
      const response = await request(httpServer)
        .post('/login')
        .send(loginStub());
      expect(response.status).toBe(201);
      const decoded = jwt.verify(response.body.token, process.env.SECRET);
      expect(decoded).toBeTruthy();
    });
  });

  describe('routes with require token', () => {
    let token = null;
    beforeAll(async () => {
      // await UserDbConnection.save(signupStub())
      const response1 = await request(httpServer)
        .post('/login')
        .send(loginStub());

      token = response1.body.token;
    });

    describe('listing users', () => {
      it('should return array', async () => {
        const response2 = await request(httpServer)
          .post('/users')
          .set('Authorization', token)
          .send({ page: 1, limit: 5 });
        expect(response2.status).toBe(201);
        expect(response2.body).toEqual(retrunListUsersStub());
      });
    });

    describe('get information from token', () => {
      it('should return an user', async () => {
        const response = await request(httpServer)
          .get('/user')
          .set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(UserReturnStub());
      });
    });

    describe('delete', () => {
      it('should delete an user', async () => {
        const response2 = await request(httpServer)
          .delete('/deleteUser')
          .set('Authorization', token);
        expect(response2.status).toBe(200);
        expect(response2.body).toMatchObject({
          message: 'user is deleted',
        });
      });
    });
  });
});
