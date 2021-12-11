import React, { Suspense, useState } from "react";
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
    const [isAuthChecked, setIsAuthChecked] = useState(false);

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

                            {/* Landing route */}
                            <Route path="/">
                                <Landing />
                            </Route>
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
