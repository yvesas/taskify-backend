/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { faker } from '@faker-js/faker';

describe('Tasks E2E Tests', () => {
  let authToken: string;
  let taskId: string;
  const email = faker.internet.email();

  before(() => {
    cy.request('POST', 'http://localhost:3000/auth/signup', {
      email: email,
      password: 'password',
    }).then(() => {
      cy.request('POST', 'http://localhost:3000/auth/signin', {
        email: email,
        password: 'password',
      }).then((response) => {
        authToken = response.body.access_token;
      });
    });
  });

  // after(() => {
  //   cy.request('GET', `http://localhost:3000/users?email=${email}`, {
  //     failOnStatusCode: false,
  //   }).then((response) => {
  //     if (response.status === 200 && response.body.length > 0) {
  //       const userId = response.body[0].id;
  //       cy.request('DELETE', `http://localhost:3000/users/${userId}`);
  //     }
  //   });
  // });

  it('should create a task', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/tasks',
      headers: { Authorization: `Bearer ${authToken}` },
      body: {
        title: 'Test Task',
        description: 'Test Description',
        status: 'PENDING',
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      taskId = response.body.id;
    });
  });

  it('should get all tasks', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/tasks',
      headers: { Authorization: `Bearer ${authToken}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should get a task by id', () => {
    cy.request({
      method: 'GET',
      url: `http://localhost:3000/tasks/${taskId}`,
      headers: { Authorization: `Bearer ${authToken}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', taskId);
    });
  });

  it('should update a task', () => {
    cy.request({
      method: 'PATCH',
      url: `http://localhost:3000/tasks/${taskId}`,
      headers: { Authorization: `Bearer ${authToken}` },
      body: { title: 'Updated Task', status: 'COMPLETED' },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('title', 'Updated Task');
      expect(response.body).to.have.property('status', 'COMPLETED');
    });
  });

  it('should delete a task', () => {
    cy.request({
      method: 'DELETE',
      url: `http://localhost:3000/tasks/${taskId}`,
      headers: { Authorization: `Bearer ${authToken}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    // Check if the task was actually deleted
    cy.request({
      method: 'GET',
      url: `http://localhost:3000/tasks/${taskId}`,
      headers: { Authorization: `Bearer ${authToken}` },
      failOnStatusCode: false, // Allows testing to continue even if the request fails.
    }).then((response) => {
      expect(response.status).to.eq(404); // Expect the request to return 404 (Not Found)
    });
  });
});
