# Carbdash Server

### Backend for team Carbdashian of Mobile Apps and Services at Georgia Tech

---

## Stack

- Deployment to AWS using [Serverless](https://www.serverless.com/)
- Typing with [Typescript](https://www.typescriptlang.org/)
- Testing with [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking, and formatting on commits using [husky](https://github.com/typicode/husky)

## Running Locally

Install DynamoDB Local:
`sls dynamodb install`

Then run:

```bash
npm install
npm run run-local

# or

yarn
yarn run-local
```
