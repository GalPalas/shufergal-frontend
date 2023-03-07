import _ from "lodash";

type PaginationProps = {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

// prettier-ignore
const Pagination = ({itemsCount,pageSize,currentPage,onPageChange}: PaginationProps) => {
    
  const pageCount = Math.ceil(itemsCount / pageSize);
  if(pageCount === 1) return null;
  const pages =  _.range(1,pageCount + 1);

  return (
    <div className="flex justify-center">
      <nav>
        <ul className="flex list-style-none">
            {pages.map(page => 
            <li key={page} className="page-item">
                <button className={page === currentPage ?
                "page-link relative block py-1.5 px-3 rounded border mx-0.5 mb-3 font-medium outline-none transition-all duration-300 text-white focus:shadow-none bg-red-700":
                "page-link relative block py-1.5 px-3 rounded border mx-0.5 mb-3 font-medium bg-transparent outline-none transition-all duration-300 text-gray-800  focus:shadow-none"}
                 onClick={() => onPageChange(page)}>{page}</button>
            </li>
            )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
