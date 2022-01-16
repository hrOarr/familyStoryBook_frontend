import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import AddNewEvent from "./pages/Events/addEvent";
import EditEvent from "./pages/Events/editEvent";
import FamilyTree from './pages/Family';
import ShowAllMembers from "./pages/Family/showAllMembers";
import MemberDashboard from "./pages/Member";
import EditEducation from './pages/Member/editEducation';
import EditJob from "./pages/Member/editJob";
import Header from "./helpers/Header";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Router>
        <Header />
        <Routes>
          <Route path="/family" element={<Home />} exact />
          <Route path="/family/show_tree" element={<FamilyTree />} />
          <Route path="/family/members" element={<ShowAllMembers />} />
          <Route path="/family/members/:memberId" element={<MemberDashboard/>} />
          <Route path="/family/members/:memberId/education/:educationId" element={<EditEducation/>} />
          <Route path="/family/members/:memberId/job/:jobId" element={<EditJob/>} />
          <Route path="/family/events" element={<Events />} />
          <Route path="/family/events/add-new" element={<AddNewEvent />} />
          <Route path="/family/events/edit/:eventId" element={<EditEvent />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
