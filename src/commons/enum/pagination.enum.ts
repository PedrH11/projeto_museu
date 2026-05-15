export enum PAGINATION {
  PAGE = 1,
  PAGESIZE = 5,
  ASC = 'ASC',
  DESC = 'DESC',
}

export const PAGINATION_VARS = {
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
  FIELD: 'field',
  ORDER: 'order',
  SEARCH: 'search',
} as const;
