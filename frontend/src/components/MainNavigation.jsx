import { NavLink } from "react-router-dom";

export default function MainNavigation() {
  return (
    <header className="w-full bg-gray-600/20 mb-10 py-6 rounded-3xl shadow-xl/12 shadow-cyan-300  ">
      <nav className="max-w-125 mx-auto">
        <ul className="flex justify-between items-center ">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : null)}
            end
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "active  transition-all duration-300"
                : " transition-all duration-300"
            }
            to={"add"}
          >
            Add
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}
