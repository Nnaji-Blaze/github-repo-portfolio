import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RepoPage from "./components/RepoPage";
import RepoDetailPage from "./components/RepoDetailPage";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFoundPage from "./components/NotFoundPage";
import Footer from "./components/Footer"; // Import Footer component
import ProfileInfo from "./components/ProfileInfo";
import "./App.css";
import { Flex } from "@chakra-ui/react"; // Import Flex component from Chakra UI

const App = () => {
  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column" // Center content vertically and horizontally
    >
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <ProfileInfo /> {/* Include ProfileInfo component */}
                <ErrorBoundary>
                  <RepoPage />
                </ErrorBoundary>
              </>
            }
          />
          <Route
            path="/repositories/:id"
            element={
              <>
                <ProfileInfo /> {/* Include ProfileInfo component */}
                <ErrorBoundary>
                  <RepoDetailPage />
                </ErrorBoundary>
              </>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer /> {/* Footer component */}
      </Router>
    </Flex>
  );
};

export default App;
