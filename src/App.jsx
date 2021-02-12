import React from "react";
//import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import "./assets/styles/main.scss";

const App = () => {
  return (
    <>
		<div id="pseudoBody">
			{/* <NavBar /> */}
			<Home />
		</div>
		<Footer />
		<div id='modals' />
	</>
  );
};

export default App;