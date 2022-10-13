import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
