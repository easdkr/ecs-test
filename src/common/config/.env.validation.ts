import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsString, validateSync } from 'class-validator'
import { IEnvironmentVariable, NodeEnvironment } from './environment.variable'

class EnvironmentVariable implements IEnvironmentVariable {
  @IsNotEmpty()
  @IsEnum(NodeEnvironment)
  NODE_ENV: NodeEnvironment

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariable, config, { enableImplicitConversion: true })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
