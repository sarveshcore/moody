import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";

export const metadata = {
  title: "moody ⋅ Dashboard",
};

function dashboardPage() {
  const isAuthenticated = true;
  let children = <Login />;
  if (isAuthenticated) {
    children = <Dashboard />;
  }
  return <Main>{children}</Main>;
}
export default dashboardPage;
