import * as Joi from 'joi';

export default () => {
  return {
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || '3000', 10),
    database: {
      host: process.env.DB_HOST || 'localhost',
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || '3306', 10),
    },
  };
};

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().default('localhost'),
  DB_NAME: Joi.string().default('demo'),
  DB_USER: Joi.string().default('root'),
  DB_PASSWORD: Joi.string().default('root'),
  DB_PORT: Joi.number().default(3306),
});
