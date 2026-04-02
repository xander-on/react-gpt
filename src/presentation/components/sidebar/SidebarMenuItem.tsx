import { NavLink } from "react-router";
import { menuRoutes } from "../../router/router";

export const SidebarMenu = () => {
  return (
    <nav className="hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem) bg-opacity-10 p-5 rounded-3xl">
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-black via-white/50 bg-clip-text text-transparent">
          ReactGPT<span className="text-indigo-500">.</span>
        </h1>
        <span className="text-xl">Bienvenido</span>

        <div className="border-gray-700 border my-3" />


        {
          menuRoutes.map( option => (
            <NavLink
              key={ option.to }
              to={ option.to }
              className={ ({ isActive }) => `flex flex-row gap-2 items-center p-2 rounded-lg hover:bg-black-100 hover:bg-opacity-10 
                ${ isActive ? 'bg-indigo-600 bg-opacity-10' : '' }` 
              }
            >
              <i className={ option.icon }></i>
              <div className="flex flex-col grow">
                <span className="text-lg">{ option.title }</span>
                <span className="text-gray-400 text-sm">{ option.description }</span>
              </div>
            </NavLink>
          ))
        }
        
      </nav>
  )
}
