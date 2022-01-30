import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUpdatedConfig } from "../../../../utilities/changeConfig";
import Radio from "../util/Radio";

import "../Embed.scss";

const typeMap = {
    f_disable: "Greet embed footer icon will be disabled.",
    f_user: "Bot will show booster's profile picture.",
    f_server: "Bot will show server's icon.",
    f_url: "You can set any custom image URL.",
};

const FooterIcon = ({
    toastId,
    updateConfig,
    disableButton,
    setDisableButton,
}) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [iconType, setIconType] = React.useState(
        greetConfig?.footerIcon?.startsWith("http")
            ? "url"
            : greetConfig?.footerIcon
    );
    const [footerIcon, setFooterIcon] = React.useState(
        greetConfig?.footerIcon || null
    );
    const [addImage, setAddImage] = React.useState(
        greetConfig?.footerIcon?.startsWith("http")
    );

    // Sync greet images
    React.useEffect(() => {
        setFooterIcon(greetConfig?.footerIcon || null);
        let type = greetConfig?.footerIcon?.startsWith("http")
            ? "url"
            : greetConfig?.footerIcon;
        if (!type) type = "disable";
        setIconType(type);
        setAddImage(greetConfig?.footerIcon?.startsWith("http"));
    }, [greetConfig]);

    // handle footer icon toggle
    const handleIconToggle = async () => {
        if (iconType === "disable") {
            setFooterIcon("");
            setIconType("user");
        } else if (iconType !== "url") {
            setFooterIcon("");
            setIconType("url");
            return;
        } else if (addImage) {
            setFooterIcon("");
            setAddImage(false);
            return;
        } else {
            if (footerIcon === null || footerIcon === "") {
                toast.error("Please enter an image URL.");
                return;
            } else if (!footerIcon.startsWith("http")) {
                setFooterIcon("");
                toast.error("Please enter a valid image URL.");
                return;
            }
            setAddImage(true);
        }
    };

    // handle footer icon save
    const handleIconSave = () => {
        if (
            iconType === greetConfig?.footerIcon ||
            (iconType === "url" && footerIcon === greetConfig?.footerIcon) ||
            (iconType === "disable" && !greetConfig?.footerIcon)
        ) {
            return toast.warn(
                `Footer icon is already '${footerIcon || "disabled"}'`
            );
        }
        if (iconType === "url" && footerIcon === "") {
            return toast.warn(`Footer icon url can not be empty.`);
        }
        setDisableButton(true);
        toastId.current = toast.info(
            `${iconType === "disable" ? "Removing" : "Updating"} footer icon`,
            {
                autoClose: false,
            }
        );
        let icon = iconType === "disable" ? null : iconType;
        if (icon === "url") {
            icon = footerIcon;
        }
        updateConfig(
            getUpdatedConfig(greetConfig, {
                footerIcon: icon,
            }),
            `${iconType === "disable" ? "Removed" : "Updated"} footer icon`
        );
    };

    return (
        <>
            <div className="greet-std-container">
                <p className="greet-title">Footer Icon</p>
                <div className="greet-content">
                    <p>
                        {iconType === "disable" ? (
                            <>
                                <b>Footer Icon disabled</b>
                                <br />
                                Bot will not add any icon in footer field of the
                                embded.
                            </>
                        ) : (
                            <>
                                <b>This will be shown if footer is enabled.</b>
                                <br />
                                Select what image you want in greet embed footer
                                icon field from given option down below.
                            </>
                        )}
                    </p>

                    <Radio
                        typeMap={typeMap}
                        prefix={"f_"}
                        iconType={iconType}
                        setIconType={setIconType}
                        icon={footerIcon}
                        setIcon={setFooterIcon}
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

export default FooterIcon;
