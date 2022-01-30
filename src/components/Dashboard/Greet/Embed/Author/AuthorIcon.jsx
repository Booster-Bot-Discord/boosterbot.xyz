import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUpdatedConfig } from "../../../../utilities/changeConfig";
import Radio from "../util/Radio";

import "../Embed.scss";

const typeMap = {
    a_disable: "Greet embed author icon will be disabled.",
    a_user: "Bot will show booster's profile picture.",
    a_server: "Bot will show server's icon.",
    a_url: "You can set any custom image URL.",
};

const AuthorIcon = ({
    toastId,
    updateConfig,
    disableButton,
    setDisableButton,
}) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [iconType, setIconType] = React.useState(
        greetConfig?.authorIcon?.startsWith("http")
            ? "url"
            : greetConfig?.authorIcon
    );
    const [authorIcon, setAuthorIcon] = React.useState(
        greetConfig?.authorIcon || null
    );
    const [addImage, setAddImage] = React.useState(
        greetConfig?.authorIcon?.startsWith("http")
    );

    // Sync greet images
    React.useEffect(() => {
        setAuthorIcon(greetConfig?.authorIcon || null);
        let type = greetConfig?.authorIcon?.startsWith("http")
            ? "url"
            : greetConfig?.authorIcon;
        if (!type) type = "disable";
        setIconType(type);
        setAddImage(greetConfig?.authorIcon?.startsWith("http"));
    }, [greetConfig]);

    // handle author icon toggle
    const handleIconToggle = async () => {
        if (iconType === "disable") {
            setAuthorIcon("");
            setIconType("user");
        } else if (iconType !== "url") {
            setAuthorIcon("");
            setIconType("url");
            return;
        } else if (addImage) {
            setAuthorIcon("");
            setAddImage(false);
            return;
        } else {
            if (authorIcon === null || authorIcon === "") {
                toast.error("Please enter an image URL.");
                return;
            } else if (!authorIcon.startsWith("http")) {
                setAuthorIcon("");
                toast.error("Please enter a valid image URL.");
                return;
            }
            setAddImage(true);
        }
    };

    // handle author icon save
    const handleIconSave = () => {
        if (
            iconType === greetConfig?.authorIcon ||
            (iconType === "url" && authorIcon === greetConfig?.authorIcon) ||
            (iconType === "disable" && !greetConfig?.authorIcon)
        ) {
            return toast.warn(
                `Author icon is already '${authorIcon || "disabled"}'`
            );
        }
        if (iconType === "url" && authorIcon === "") {
            return toast.warn(`Author icon url can not be empty.`);
        }
        setDisableButton(true);
        toastId.current = toast.info(
            `${iconType === "disable" ? "Removing" : "Updating"} author icon`,
            {
                autoClose: false,
            }
        );
        let icon = iconType === "disable" ? null : iconType;
        if (icon === "url") {
            icon = authorIcon;
        }
        updateConfig(
            getUpdatedConfig(greetConfig, {
                authorIcon: icon,
            }),
            `${iconType === "disable" ? "Removed" : "Updated"} author icon`
        );
    };

    return (
        <>
            <div className="greet-std-container">
                <p className="greet-title">Author Icon</p>
                <div className="greet-content">
                    <p>
                        {iconType === "disable" ? (
                            <>
                                <b>Author Icon disabled</b>
                                <br />
                                Bot will not add any icon in author field of the
                                embded.
                            </>
                        ) : (
                            <>
                                <b>This will be shown if author is set.</b>
                                <br />
                                Select what image you want in greet embed author
                                icon field from given option down below.
                            </>
                        )}
                    </p>

                    <Radio
                        typeMap={typeMap}
                        prefix={"a_"}
                        iconType={iconType}
                        setIconType={setIconType}
                        icon={authorIcon}
                        setIcon={setAuthorIcon}
                        addImage={addImage}
                        setAddImage={setAddImage}
                        handleIconToggle={handleIconToggle}
                        handleIconSave={handleIconSave}
                        disableButton={disableButton}
                    />
                </div>
            </div>
        </>
    );
};

export default AuthorIcon;
