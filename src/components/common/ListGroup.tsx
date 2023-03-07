import { Category } from "types";

type ListGroupProps = {
  items: Category[];
  selectedItem?: Category | undefined;
  onItemSelect: (item: Category) => void;
};

const ListGroup = ({ items, selectedItem, onItemSelect }: ListGroupProps) => {
  return (
    <ul className="hidden list-group lg:inline-block">
      {items.map((item) => (
        <li
          key={item._id}
          className={
            item.name === selectedItem?.name
              ? "selected-active"
              : "selected-inactive"
          }
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
