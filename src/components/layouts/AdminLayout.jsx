import { Button } from "../ui/button";
import { IoIosPricetags } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import AdminPage from "../guard/AdminPage";

const SidebarItem = ({ children, active = false }) => {
  return (
    <Button
      variant="ghost"
      size="lg"
      className={`w-full rounded-none justify-start px-6 py-3 transition-all duration-200 hover:bg-slate-100 hover:border-r-4 hover:border-blue-500 ${
        active ? 'bg-blue-50 border-r-4 border-blue-500 text-blue-700' : 'text-gray-700'
      }`}
    >
      {children}
    </Button>
  );
};

export const AdminLayout = ({ title, description, rightSection, children }) => {
  return (
    <AdminPage>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 shadow-sm">
          {/* Header */}
          <div className="h-16 border-b border-gray-200 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col py-4">
            <SidebarItem active={true}>
              <IoIosPricetags className="w-5 h-5" />
              <span className="ml-3 text-base font-medium">Products Management</span>
            </SidebarItem>
            <SidebarItem>
              <IoCartSharp className="w-5 h-5" />
              <span className="ml-3 text-base font-medium">Order Management</span>
            </SidebarItem>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 w-full bg-white border-b border-gray-200 flex items-center justify-end px-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <Button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <IoPersonCircle className="h-8 w-8 text-gray-600" />
              </Button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6">
            {/* Page Header */}
            <div className="flex justify-between items-start pb-6 border-b border-gray-200 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                <p className="text-gray-600 text-lg">{description}</p>
              </div>
              <div className="flex-shrink-0">
                {rightSection}
              </div>
            </div>

            {/* Page Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminPage>
  );
};