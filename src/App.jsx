import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import "./assets/styles/main.scss";

const Home     = lazy(() => import("./pages/Home"));
// const Rules    = lazy(() => import("./pages/Rules"));
// const About    = lazy(() => import("./pages/singular/About"));
// const Landing  = lazy(() => import("./pages/singular/Landing"));
// const Commands = lazy(() => import("./pages/info/Commands"));
// const Faq      = lazy(() => import("./pages/info/Faq"));
const NotFound = lazy(() => import("./pages/singular/NotFound"));

const App = () => {
  return (
    <>
		<div id="pseudoBody">
			<NavBar />
			<Switch>
				<Route exact static component={() => <Suspense fallback={<div/>}><Home /></Suspense>} path="/"/>
				{/* <Route component={() => <Suspense fallback={<div/>}><Commands /></Suspense>} path="/commands" />
				<Route component={() => <Suspense fallback={<div/>}><Faq /></Suspense>} path="/faq" />
				<Route component={() => <Suspense fallback={<div/>}><Rules /></Suspense>} path="/rules" />
				<Route component={() => <Suspense fallback={<div/>}><About /></Suspense>} path="/about" />
				<Route component={() => <Suspense fallback={<div/>}><Landing /></Suspense>} path="/landing" /> */}
				
				<Route component={() => <Suspense fallback={<div/>}><NotFound /></Suspense>} path="*" />
			</Switch>
		</div>
		<Footer />
	</>
  );
};

export default App;