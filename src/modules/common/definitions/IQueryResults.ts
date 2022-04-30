import IDoc from './IDoc';

export default interface IQueryResult {
  results: IDoc[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
