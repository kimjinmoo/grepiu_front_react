import './App.css';
import GrepIUNav from "./components/commons/GrepIUNav";
import {Container} from "react-bootstrap";
import GrepIUFooter from "./components/commons/GrepIUFooter";
import GrepIUNavigator from "./components/commons/GrepIUNavigator";
import {Route, Routes} from "react-router-dom";
import {webRoutes} from "./router/web.route";
import RequireAuth from "./router/RequireAuth";
import {NotificationContainer} from "react-notifications";

function App() {
  return (
      <div>
        <GrepIUNav/>
        <GrepIUNavigator/>
        <Container fluid>
          <Routes>
            {
              webRoutes.map(page => (<Route
                  key={page.path}
                  path={page.path}
                  element={
                    <>
                      {
                        page.authorize ?
                            <RequireAuth children={page.element}/>
                            : page.element
                      }
                    </>
                  }
                  authorize={page.authorize}
              />))
            }
          </Routes>
        </Container>
        <GrepIUFooter/>
        <NotificationContainer/>
      </div>
  );
}

export default App;
