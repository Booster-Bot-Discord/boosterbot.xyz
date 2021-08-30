import React from "react";

import "./Blob.scss";
import "./blobz.min.css";

const Blob = () => {
    return (
        <>
            <div className="blob-wrapper">
                <div className="tk-blob blob-wrapper-1" style={{"--time": "90s", "--fill": "#6600FF"}}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320.6 343.9"
                    >
                        <path d="M275.9 63.1c30.7 37.3 50.9 84.2 43 126.9-7.9 42.7-44.1 81.2-93 112.1C177 332.9 115.2 356 70.9 337 26.5 317.9-.4 256.7 0 204.6c.4-52 28-95 59.7-132.5C91.4 34.5 127.1 2.3 165.5.1c38.5-2.2 79.7 25.7 110.4 63z"></path>
                    </svg>
                </div>
                <div className="tk-blob blob-wrapper-2" style={{"--time": "30s", "--fill": "#6600FF"}}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320.6 343.9"
                    >
                        <path d="M275.9 63.1c30.7 37.3 50.9 84.2 43 126.9-7.9 42.7-44.1 81.2-93 112.1C177 332.9 115.2 356 70.9 337 26.5 317.9-.4 256.7 0 204.6c.4-52 28-95 59.7-132.5C91.4 34.5 127.1 2.3 165.5.1c38.5-2.2 79.7 25.7 110.4 63z"></path>
                    </svg>
                </div>
                <div className="tk-blob blob-wrapper-3" style={{"--time": "25s", "--fill": "#6600FF"}}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320.6 343.9"
                    >
                        <path d="M275.9 63.1c30.7 37.3 50.9 84.2 43 126.9-7.9 42.7-44.1 81.2-93 112.1C177 332.9 115.2 356 70.9 337 26.5 317.9-.4 256.7 0 204.6c.4-52 28-95 59.7-132.5C91.4 34.5 127.1 2.3 165.5.1c38.5-2.2 79.7 25.7 110.4 63z"></path>
                    </svg>
                </div>
            </div>
        </>
    );
};

export default Blob;
