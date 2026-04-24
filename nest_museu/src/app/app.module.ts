import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { DataBaseModule } from '../database/database.module';
import { AcessoModule } from '../module/access/acesso.module';
import { AuthModule } from '../module/auth/auth.module';
import { ContactModule } from '../module/contact/contact.module';
import { EmailModule } from '../module/email/email.module';
import { EventModule } from '../module/event/event.module';
import { FotoModule } from '../module/imagem/foto.module';
import { ResourceModule } from '../module/resource/resource.module';
import { UsuarioModule } from '../module/usuario/usuario.module';

const modules = [
  DataBaseModule,
  UsuarioModule,
  FotoModule,
  AuthModule,
  ContactModule,
  EventModule,
  ResourceModule,
  EmailModule,
  AcessoModule,
];

@Module({
  imports: [
    ServeStaticModule.forRoot({
      // Resolve transforma o caminho em absoluto para o SO
      // Se for Linux: '/uploads_projeto_museu'
      // Se for Windows: 'C:\\uploads_projeto_museu'
      rootPath: resolve('/uploads_projeto_museu'),

      // Esse é o prefixo da URL.
      // Ex: http://localhost:3000/media/pecas/foto.jpg
      serveRoot: '/media',

      // Configurações extras úteis
      serveStaticOptions: {
        index: false, // Desativa procurar por index.html
      },
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ...modules,
  ],
})
export class AppModule {}
