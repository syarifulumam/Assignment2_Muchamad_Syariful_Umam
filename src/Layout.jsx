import { Outlet } from "react-router";
import "./App.css";
import { ModeToggle } from "./components/mode-toggle.jsx";

const Layout = () => {
  return (
    <>
      <header>
        <nav className="flex justify-between items-center container py-3 shadow-md bg-primary">
          <h1 className="md:text-2xl font-bold">Where in the world?</h1>
          <ModeToggle />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
