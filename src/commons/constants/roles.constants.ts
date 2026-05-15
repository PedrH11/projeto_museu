export const ROLES_NAME = {
  SUPER_ADMINISTRADOR: 'Super Administrador',
  ADMINISTRADOR: 'Administrador',
  CURADOR: 'Curador',
  USUARIO: 'Usuário',
  VISITANTE: 'Visitante',
} as const;

export type RoleName = (typeof ROLES_NAME)[keyof typeof ROLES_NAME];
