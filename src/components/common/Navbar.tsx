import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItemsCount, resetCart } from "store/slices/cartSlice";
import { selectUserName } from "store/slices/userSlice";
import { Menu } from "@headlessui/react";
import { userLogout } from "store/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector(selectCartItemsCount);
  const userName: string = useSelector(selectUserName)!;

  const logoutClickHandler = () => {
    dispatch(userLogout({}));
    dispatch(resetCart({}));
  };

  return (
    <nav className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      <div className="relative flex item-center h-10 my-auto cursor-pointer md:w-1/2">
        <Link to="/" className="flex flex-col space-y-1 items-center">
          <img src="images/shufergal.png" alt="logo" />
          <span className="font-bold text-red-700 ml-4 font-serif sm:text-lg md:text-xl">
            Shufergal
          </span>
        </Link>
      </div>
      <div></div>
      <div className="flex items-center space-x-4 text-gray-500 justify-end">
        <div>
          <Link to="/cart" className="flex items-center justify-center gap-2">
            Cart
            {itemsInCart > 0 && (
              <div className="flex-none flex items-center justify-center w-5 h-5 rounded-full text-white bg-red-700 font-bold text-sm">
                {itemsInCart}
              </div>
            )}
          </Link>
        </div>
        <div>
          {userName ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="text-red-700">{userName}</Menu.Button>
              <Menu.Items className="absolute right-0 w-40 origin-top-right bg-white shadow-lg text-black">
                <Menu.Item>
                  <Link to="/order-history" className="dropdown-link">
                    My Orders
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to="/login"
                    className="dropdown-link"
                    onClick={logoutClickHandler}
                  >
                    Log Out
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
