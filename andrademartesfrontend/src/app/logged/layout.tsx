import { Sidebar } from "../../components/sidebar";

export default function LoggedLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      {children}
    </div>
  );
}