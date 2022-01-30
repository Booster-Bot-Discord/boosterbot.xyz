import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUpdatedConfig } from "../../../../utilities/changeConfig";

import Text from "../util/Text";

import "../Embed.scss";

const Author = ({ toastId, updateConfig, disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [isDisabled, setIsDisabled] = React.useState(
        greetConfig?.author ? false : true
    );
    const [author, setAuthor] = React.useState(greetConfig?.author || null);

    // Sync greet images
    React.useEffect(() => {
        setAuthor(greetConfig?.author || null);
        setIsDisabled(greetConfig?.author ? false : true);
    }, [greetConfig]);

    // handle author toggle
    const handleAuthorToggle = () => {
        if (isDisabled) {
            setAuthor("");
        } else {
            setAuthor(null);
        }
        setIsDisabled(!isDisabled);
    };

    // handle author save
    const handleAuthorSave = () => {
        if (author === greetConfig?.author) {
            return toast.warn(`Author is already ${author || "disabled"}`);
        }
        if (author === "" || author === null) {
            return toast.warn(`Author can not be empty.`);
        }
        setDisableButton(true);
        toastId.current = toast.info(
            `${author ? "Setting" : "Removing"} author`,
            {
                autoClose: false,
            }
        );
        updateConfig(
            getUpdatedConfig(greetConfig, { author: author }),
            `${author ? "Updated" : "Removed"} author`
        );
    };

    return (
        <>
            <div className="greet-std-container">
                <p className="greet-title">Author Text</p>
                {!isDisabled ? (
                    <p className="greet-content">
                        Feel free to use <b>bb vars</b> in this field. <br />
                        Bot will set this text in greet embed author field.
                    </p>
                ) : (
                    <p className="greet-content">
                        <b>There will be no author and author icon</b>
                        <br />
                        Enable now to set author name and icon in greet embed.
                    </p>
                )}

                <Text
                    isDisabled={isDisabled}
                    text={author}
                    setText={setAuthor}
                    handleTextSave={handleAuthorSave}
                    handleTextToggle={handleAuthorToggle}
                    disableButton={disableButton}
                    maxLength={1000}
                />
            </div>
        </>
    );
};

export default Author;
