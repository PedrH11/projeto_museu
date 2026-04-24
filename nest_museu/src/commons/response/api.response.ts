export interface Link {
  href: string;
  method?: string;
}

export interface ApiResponse<T> {
  status: number;
  timestamp: string;
  path?: string | null;
  mensagem?: string;
  erro?: string | null;
  dados?: T | null;
  metodo?: string;
  _links?: Record<string, Link>;
}
