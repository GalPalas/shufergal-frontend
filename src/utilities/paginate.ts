import _ from "lodash";
import { Product } from "types";

export const paginate = (
  items: Product[],
  pageNumber: number,
  pageSize: number
) => {
  const startIndex: number = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};
