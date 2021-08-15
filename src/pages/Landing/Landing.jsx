import React from "react";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";

const Landing = () => {
    return (
        <>
            <div className="flex flex-col">
                <Navbar />
                <Hero />
            </div>
        </>
    );
};

export default Landing;
