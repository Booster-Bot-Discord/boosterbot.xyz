import React, { Suspense, useState } from "react";
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
    useHistory,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useDiscordLogin, useAuthCheck } from "./services/auth";

import Loading from "./components/utilities/Loading";

import "./scss/App.scss";
import "react-toastify/dist/ReactToastify.css";

const Privacy = React.lazy(() => import("./pages/Privacy/Privacy"));
const Landing = React.lazy(() => import("./pages/Landing/Landing"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const ServerPicker = React.lazy(() =>
    import("./pages/ServerPicker/ServerPicker")
);

function App() {
    const history = useHistory();
    const authCheck = useAuthCheck();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const isAuthenticated = useSelector(
        (state) => state.user?.isAuthenticated || false
    );

    const discordLogin = useDiscordLogin();
    const redirectDashboardBase = () =>
        history.location.pathname.endsWith("/")
            ? history.location.pathname + "general"
            : history.location.pathname + "/general";

    React.useEffect(() => {
        async function checkAuth() {
            await authCheck();
        }
        checkAuth().then(() => setIsAuthChecked(true));
        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        if (isAuthChecked && !isAuthenticated) {
            discordLogin();
        }
    }, [isAuthChecked, isAuthenticated, discordLogin]);

    return (
        <>
            <ToastContainer theme="dark" />
            {!isAuthChecked ? (
                <Loading />
            ) : (
                <BrowserRouter>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            {/* Server Picker route */}
                            <Route exact path="/dashboard">
                                <ServerPicker />
                            </Route>

                            {/* Dashboard route */}
                            <Route exact path="/dashboard/:id">
                                <Redirect to={redirectDashboardBase()} />
                            </Route>
                            <Route path="/dashboard/:id">
                                <Dashboard />
                            </Route>

                            {/* Privacy route */}
                            <Route path="/privacy">
                                <Privacy />
                            </Route>

                            {/* Landing route */}
                            <Route path="/">
                                <Landing />
                            </Route>

                            {/* Redirect to landing page if no route is found */}
                            <Redirect to="/" />
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
