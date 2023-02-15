// eslint-disable-next-line no-shadow
export enum NodeEnvironment {
  Development = 'dev',
  Production = 'prod',
  Test = 'test',
}

export interface IEnvironmentVariable {
  NODE_ENV: NodeEnvironment

  DATABASE_URL: string
}
