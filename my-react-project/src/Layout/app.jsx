import SideBar from "../Components/NavBar/SideBar";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</div>
    </div>
  );
}
