export class GetCategoriesAndTodosDto {
  idx: number;
  title: string;
  color: string;
  data: {
    idx: number;
    title: string;
    color: string;
    executionTime: number;
  }[];
}
