import { useEffect } from "react";
import { LayoutProps } from "types";

const Layout = ({ title, children }: LayoutProps) => {
  useEffect(() => {
    document.title = title + " - Shufergal";
  }, [title]);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <main className="container m-auto mt-4 px-4">{children}</main>
      <footer className="flex h-10 justify-center items-center shadow-inner">
        <p className="text-red-700">Copyright &copy; 2023 Shufergal</p>
      </footer>
    </div>
  );
};

export default Layout;
