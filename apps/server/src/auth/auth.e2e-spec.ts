// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';

// import { getApplication } from '../../test/utils/get-application';

// describe.only('AuthModule', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     app = await getApplication();
//   });

//   describe('Mutation #register', () => {
//     const mutation = () => `
//       mutation register(
//         $email: String!,
//         $password: String!
//       ) {
//         register(input: { email: $email, password: $password }) {
//           id
//         }
//       }
//     `;

//     it('should register a new user', async () => {
//       const { body } = await request(app.getHttpServer())
//         .post('/graphql')
//         .send({
//           query: mutation(),
//           variables: {
//             email: 'new-user@gmail.com',
//             password: 'new-user-123',
//           },
//         });

//       expect(body.data.register.id).toBeTruthy();
//     });

//     it('should throw error if email is already taken', async () => {
//       await request(app.getHttpServer())
//         .post('/graphql')
//         .send({
//           query: mutation(),
//           variables: {
//             email: 'new-user2@gmail.com',
//             password: 'new-user-123',
//           },
//         });

//       const { body } = await request(app.getHttpServer())
//         .post('/graphql')
//         .send({
//           query: mutation(),
//           variables: {
//             email: 'new-user2@gmail.com',
//             password: 'new-user-123',
//           },
//         });

//       // expect(error).not.toBeInstanceOf(NoErrorThrownError);
//       // expect(error).toHaveProperty('statusCode', 404);
//     });
//   });
// });
