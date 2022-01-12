import React from "react";

import Author from "./Author/Author";
import AuthorIcon from "./Author/AuthorIcon";

import "./Embed.scss";

const Embed = ({ disableButton, setDisableButton }) => {
    return (
        <>
            <Author
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />
            <AuthorIcon
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />
        </>
    );
};

export default Embed;
