import React from "react";
import { useSelector } from "react-redux";

import Text from "../util/Text";

import "../Embed.scss";

const Footer = ({ disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [isDisabled, setIsDisabled] = React.useState(
        greetConfig?.footer ? false : true
    );
    const [footer, setFooter] = React.useState(greetConfig?.footer || null);

    // Sync greet images
    React.useEffect(() => {
        setFooter(greetConfig?.footer || null);
        setIsDisabled(greetConfig?.footer ? false : true);
    }, [greetConfig]);

    // handle footer toggle
    const handleFooterToggle = () => {
        if (isDisabled) {
            setFooter("");
        } else {
            setFooter(null);
        }
        setIsDisabled(!isDisabled);
    };

    // handle footer save
    const handleFooterSave = () => {
        setDisableButton(true);

        // TODO: backend call to save footer

        setDisableButton(false);
    };

    return (
        <>
            <div className="greet-std-container">
                <p className="greet-title">Footer Text</p>
                {!isDisabled ? (
                    <p className="greet-content">
                        Feel free to use <b>bb vars</b> in this field. <br />
                        Bot will set this text in greet embed footer field.
                    </p>
                ) : (
                    <p className="greet-content">
                        <b>There will be no footer and footer icon</b>
                        <br />
                        Enable now to set footer name and icon in greet embed.
                    </p>
                )}

                <Text
                    isDisabled={isDisabled}
                    text={footer}
                    setText={setFooter}
                    handleTextSave={handleFooterSave}
                    handleTextToggle={handleFooterToggle}
                    disableButton={disableButton}
                />
            </div>
        </>
    );
};

export default Footer;
