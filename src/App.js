import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Config/routes";
import Header from "./helpers/Header";
import { Container } from "react-bootstrap";
import AppRoute from "./Config/appRoute";
import { AuthProvider } from "./Context";

function App() {
  return (
    <Container>
      <AuthProvider>
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
      </AuthProvider>
    </Container>
  );
}

export default App;
