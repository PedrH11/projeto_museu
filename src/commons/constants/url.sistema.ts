export type RotaRecurso = {
  BASE: string;
  ID: string;
};

export function gerarRotaRecurso(entidade: string): RotaRecurso {
  return {
    BASE: entidade,
    ID: ':id',
  };
}
