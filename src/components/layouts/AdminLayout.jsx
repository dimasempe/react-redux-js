import { Button } from "../ui/button";
import { IoIosPricetags } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";


const SidebarItem = ({ children }) => {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="w-full rounded-none justify-start"
    >
      {children}
    </Button>
  );
};
export const AdminLayout = ({ title, description, rightSection, children }) => {
  return (
    <div className="flex">
      <aside className="w-72 border-r h-screen">
        <div className="h-16 border-b flex items-center justify-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="flex flex-col">
          <SidebarItem>
            <IoIosPricetags />
            <span className="ml-4 text-lg">Products Management</span>
          </SidebarItem>
          <SidebarItem>
            <IoCartSharp />
            <span className="ml-4 text-lg">Order Management</span>
          </SidebarItem>
        </div>
      </aside>

      <div className="flex-1">
        <header className="h-16 w-full border-b flex items-center justify-end px-4">
          <button>
            <IoPersonCircle className="h-15 w-15" />
          </button>
        </header>

        <main className="flex flex-col p-4">
          <div className="flex justify-between items-center pb-4 border-b mb-8">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            {rightSection}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};
