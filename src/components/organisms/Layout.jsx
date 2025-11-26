import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // The search will be handled by the BrowseListings page
    // We could use context or props to pass this down if needed
    console.log("Search query:", query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;