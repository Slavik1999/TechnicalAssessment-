import CreatePage from "@pages/CreatePage/CreatePage";
import LadingPage from "@pages/LandingPage/LandingPage";
import { 
  Route, 
  Switch, 
  useLocation
} from "react-router-dom";
import { ROUTES } from "./utils/routes";

const Routes = [
  {path: ROUTES.Landing, component: LadingPage, exact: true},
  {path: ROUTES.Create, component: CreatePage, exact: true},
  {path: ROUTES.Event, component: CreatePage, exact: true},
];

const AppRouter = () => {
  const location = useLocation();

  return (
    <Switch location={location}>
      {Routes.map((route) => <Route {...route} key={route.path}/>)}
    </Switch>
  );
};

export default AppRouter;