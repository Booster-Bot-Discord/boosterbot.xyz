import React from "react";

import Author from "./Author/Author";
import AuthorIcon from "./Author/AuthorIcon";
import Footer from "./Footer/Footer";
import FooterIcon from "./Footer/FooterIcon";
import Color from "./Color/Color";
import Thumbnail from "./Thumbnail/Thumbnail";

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

            <Color
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />
            <Thumbnail
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />

            <Footer
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />
            <FooterIcon
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />
        </>
    );
};

export default Embed;
