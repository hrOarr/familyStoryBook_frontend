import Home from "../pages/Home";
import Events from "../pages/Events";
import AddNewEvent from "../pages/Events/addEvent";
import EditEvent from "../pages/Events/editEvent";
import FamilyTree from '../pages/Family';
import ShowAllMembers from "../pages/Family/showAllMembers";
import MemberDashboard from "../pages/Member";
import EditEducation from '../pages/Member/editEducation';
import EditAchievement from "../pages/Member/editAchievement";
import EditJob from "../pages/Member/editJob";
import Login from "../pages/Auth/login";

const routes = [
    {
        path: "/family",
        element: Home,
        isPrivate: false
    },
    {
        path: "/auth/login",
        element: Login,
        isPrivate: false
    },
    {
        path: "/family/show_tree",
        element: FamilyTree,
        isPrivate: true
    },
    {
        path: "/family/members",
        element: ShowAllMembers,
        isPrivate: true
    },
    {
        path: "/family/members/:memberId",
        element: MemberDashboard,
        isPrivate: true
    },
    {
        path: "/family/members/:memberId/education/:educationId",
        element: EditEducation,
        isPrivate: true
    },
    {
        path: "/family/members/:memberId/job/:jobId",
        element: EditJob,
        isPrivate: true
    },
    {
        path: "/family/members/:memberId/achievement/:achievementId",
        element: EditAchievement,
        isPrivate: true
    },
    {
        path: "/family/events",
        element: Events,
        isPrivate: true
    },
    {
        path: "/family/events/add-new",
        element: AddNewEvent,
        isPrivate: true
    },
    {
        path: "/family/events/edit/:eventId",
        element: EditEvent,
        isPrivate: true
    }
];

export default routes;