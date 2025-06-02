"use client";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuth } from "@/context/AuthContext";

// export const metadata = {
//   title: "moody ⋅ Dashboard",
// };

function DashboardPage() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <Main>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </Main>
    );
  }

  return <Main>{currentUser ? <Dashboard /> : <Login />}</Main>;
}

export default DashboardPage;
