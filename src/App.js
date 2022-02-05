import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Config/routes";
import Header from "./helpers/Header";
import { Container } from "react-bootstrap";
import AppRoute from "./Config/appRoute";
import { AuthProvider } from "./Context/AuthContext";
import { AchievementProvider } from "./Context/achievementContext";
import { EducationProvider } from "./Context/EducationContext";
import { JobProvider } from "./Context/JobContext";
import { MemberProvider } from "./Context/MemberContext";

function App() {
  return (
    <Container>
      <AuthProvider>
        <AchievementProvider>
          <EducationProvider>
            <JobProvider>
              <MemberProvider>
                <Router>
                  <Header />
                  <Routes>
                    {routes.map((route) => (
                      <Route
                        path={route.path}
                        element={
                          <AppRoute
                            component={route.element}
                            isPrivate={route.isPrivate}
                          />
                        }
                      />
                    ))}
                  </Routes>
                </Router>
              </MemberProvider>
            </JobProvider>
          </EducationProvider>
        </AchievementProvider>
      </AuthProvider>
    </Container>
  );
}

export default App;
