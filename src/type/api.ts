export interface Link {
  href: string;
  method?: string;
}

export type ApiResponse<T> = {
  status: number;
  timestamp?: string;
  path?: string | null;
  mensagem?: string;
  erro?: string | null;
  errors?: Record<string, string[]>; // 🔥 novo campo
  dados?: T;
  metodo?: string;
  _links?: Record<string, Link>;
  success?: boolean | null;
};

export interface PageResponse<T> {
  content?: T[];
  totalPages?: number;
  totalElements?: number;
  pageSize?: number;
  page?: number;
  lastPage?: number;
  order?: string;
  fields?: string;
}

export interface SearchParams {
  page?: number;
  pageSize?: number;
  field?: string;
  order?: string;
  search?: string;
}
