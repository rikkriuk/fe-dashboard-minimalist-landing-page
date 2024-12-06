import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";
import LoginComponent from "./components/LoginComponent";
import ProtectedRouteComponent from "./components/ProtectedRouteComponent";
import DashboardComponent from "./components/DashboardComponent";
import BlogContainer from "./containers/BlogContainer";
import PortfolioContainer from "./containers/PortfolioContainer";
import ProfileComponent from "./components/ProfileComponent";
import TestimonialContainer from "./containers/TestimonialContainer";
import ContactListComponent from "./components/ContactComponent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
    
        <Route path="/dashboard" element={<LayoutComponent />}>
          <Route
            index
            element={
              <ProtectedRouteComponent>
                <DashboardComponent />
              </ProtectedRouteComponent>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRouteComponent>
                <ProfileComponent />
              </ProtectedRouteComponent>
            }
          />

          <Route
            path="blog"
            element={
              <ProtectedRouteComponent>
                <BlogContainer />
              </ProtectedRouteComponent>
            }
          />
          
          <Route
            path="blog/add"
            element={
              <ProtectedRouteComponent>
                <BlogContainer />
              </ProtectedRouteComponent>
            }
          />

          <Route
            path="blog/edit/:id"
            element={
              <ProtectedRouteComponent>
                <BlogContainer />
              </ProtectedRouteComponent>
            }
          />

          <Route
            path="portfolio"
            element={
              <ProtectedRouteComponent>
                <PortfolioContainer />
              </ProtectedRouteComponent>
            }
          />

          <Route
            path="portfolio/add"
            element={
              <ProtectedRouteComponent>
                <PortfolioContainer />
              </ProtectedRouteComponent>
            }
          />

          <Route
            path="portfolio/edit/:id"
            element={
              <ProtectedRouteComponent>
                <PortfolioContainer />
              </ProtectedRouteComponent>
            }
          />

          <Route
            path="testimonial"
            element={
              <ProtectedRouteComponent>
                <TestimonialContainer />
              </ProtectedRouteComponent>
            }
          />

          <Route
            path="testimonial/add"
            element={
              <ProtectedRouteComponent>
                <TestimonialContainer />
              </ProtectedRouteComponent>
            }
          />

          <Route
            path="testimonial/edit/:id"
            element={
              <ProtectedRouteComponent>
                <TestimonialContainer />
              </ProtectedRouteComponent>
            }
          />

          <Route
            path="contact"
            element={
              <ProtectedRouteComponent>
                <ContactListComponent />
              </ProtectedRouteComponent>
            }
          />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
