import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
    useHistory,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthCheck } from "./services/auth";

import Loading from "./components/utilities/Loading";

import "./scss/App.scss";
import "react-toastify/dist/ReactToastify.css";

const Landing = React.lazy(() => import("./pages/Landing/Landing"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const ServerPicker = React.lazy(() =>
    import("./pages/ServerPicker/ServerPicker")
);

function App() {
    const history = useHistory();
    const authCheck = useAuthCheck();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    // eslint-disable-next-line
    React.useEffect(authCheck, []);
    return (
        <>
            <ToastContainer theme="dark" />
            <BrowserRouter>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        {/* Server Picker route */}
                        <Route exact path="/dashboard">
                            {isAuthenticated ? (
                                <ServerPicker />
                            ) : (
                                <Redirect to="/" />
                            )}
                        </Route>

                        {/* Dashboard route */}
                        <Route exact path="/dashboard/:id">
                            <Redirect
                                to={
                                    history.location.pathname.endsWith("/")
                                        ? history.location.pathname + "general"
                                        : history.location.pathname + "/general"
                                }
                            />
                        </Route>
                        <Route path="/dashboard/:id">
                            <Dashboard />
                        </Route>

                        {/* Landing route */}
                        <Route path="/">
                            <Landing />
                        </Route>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
