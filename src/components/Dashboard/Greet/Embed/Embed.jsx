import React from "react";

import Author from "./Author/Author";
import AuthorIcon from "./Author/AuthorIcon";
import Footer from "./Footer/Footer";
import FooterIcon from "./Footer/FooterIcon";
import Title from "./Title/Title";
import Color from "./Color/Color";
import Thumbnail from "./Thumbnail/Thumbnail";

import "./Embed.scss";

const Embed = ({ toastId, updateConfig, disableButton, setDisableButton }) => {
    return (
        <>
            <Author
                toastId={toastId}
                updateConfig={updateConfig}
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />
            <AuthorIcon
                toastId={toastId}
                updateConfig={updateConfig}
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />

            <Title
                toastId={toastId}
                updateConfig={updateConfig}
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />
            <Thumbnail
                toastId={toastId}
                updateConfig={updateConfig}
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />

            <Footer
                toastId={toastId}
                updateConfig={updateConfig}
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />
            <FooterIcon
                toastId={toastId}
                updateConfig={updateConfig}
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />

            <Color
                toastId={toastId}
                updateConfig={updateConfig}
                disableButton={disableButton}
                setDisableButton={setDisableButton}
            />
        </>
    );
};

export default Embed;
