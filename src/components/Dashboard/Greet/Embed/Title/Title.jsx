import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUpdatedConfig } from "../../../../utilities/changeConfig";

import Text from "../util/Text";

import "../Embed.scss";

const Title = ({ toastId, updateConfig, disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [isDisabled, setIsDisabled] = React.useState(
        greetConfig?.title ? false : true
    );
    const [title, setTitle] = React.useState(greetConfig?.title || null);

    // Sync greet images
    React.useEffect(() => {
        setTitle(greetConfig?.title || null);
        setIsDisabled(greetConfig?.title ? false : true);
    }, [greetConfig]);

    // handle title toggle
    const handleTitleToggle = () => {
        if (isDisabled) {
            setTitle("");
        } else {
            setTitle(null);
        }
        setIsDisabled(!isDisabled);
    };

    // handle title save
    const handleTitleSave = () => {
        if (title === greetConfig?.author) {
            return toast.warn(`Title is already ${title || "disabled"}`);
        }
        if (title === "" || title === null) {
            return toast.warn(`Title can not be empty.`);
        }
        setDisableButton(true);
        toastId.current = toast.info(
            `${title ? "Setting" : "Removing"} title`,
            {
                autoClose: false,
            }
        );
        updateConfig(
            getUpdatedConfig(greetConfig, { title: title }),
            `${title ? "Updated" : "Removed"} title`
        );
    };

    return (
        <>
            <div className="greet-std-container">
                <p className="greet-title">Embed Title</p>
                {!isDisabled ? (
                    <p className="greet-content">
                        Feel free to use <b>bb vars</b> in this field. <br />
                        Bot will set this text in greet embed title field.
                    </p>
                ) : (
                    <p className="greet-content">
                        <b>There will be no bold header to emebd</b>
                        <br />
                        Enable now to set embed title headline.
                    </p>
                )}

                <Text
                    isDisabled={isDisabled}
                    text={title}
                    setText={setTitle}
                    handleTextSave={handleTitleSave}
                    handleTextToggle={handleTitleToggle}
                    disableButton={disableButton}
                />
            </div>
        </>
    );
};

export default Title;
