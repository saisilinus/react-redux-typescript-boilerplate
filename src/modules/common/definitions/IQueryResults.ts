import { IDoc } from './IDoc';

export interface IQueryResult {
  results: IDoc[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
