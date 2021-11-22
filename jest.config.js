const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/flight-app',
    '<rootDir>/libs/flight-lib',
    '<rootDir>/libs/logger-lib',
    '<rootDir>/libs/dashboard-lib',
    '<rootDir>/apps/flight-admin',
    '<rootDir>/apps/dashboard',
    '<rootDir>/apps/external',
    '<rootDir>/libs/passenger/domain',
    '<rootDir>/apps/passenger',
    '<rootDir>/libs/passenger/feature-search',
    '<rootDir>/libs/passenger/feature-edit',
  ],
};
