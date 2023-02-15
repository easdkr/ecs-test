import { ApplicationFactory } from './application.factory'

async function bootstrap() {
  const app = await ApplicationFactory.create()
  app.listen(3000)
}
bootstrap()
