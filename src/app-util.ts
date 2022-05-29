import { INestApplication } from '@nestjs/common';

/**
 * Setup the test application to matches the production application
 * @param {INestApplication} app
 * @returns {INestApplication}
 */
const setupApplication = (app: INestApplication): INestApplication => {
  return app;
};

export { setupApplication };
