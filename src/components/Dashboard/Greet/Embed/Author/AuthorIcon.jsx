import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "../Embed.scss";

const typeMap = {
    disable: "Greet embed author icon will be disabled.",
    user: "Bot will show booster's profile picture.",
    server: "Bot will show server's icon.",
    url: "You can set any custom image URL.",
};

const AuthorIcon = ({ disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [iconType, setIconType] = React.useState(
        greetConfig?.authorIcon?.startsWith("http")
            ? "url"
            : greetConfig?.authorIcon
    );
    const [authorIcon, setAuthorIcon] = React.useState(
        greetConfig?.authorIcon || null
    );
    const [addImage, setAddImage] = React.useState(false);

    // Sync greet images
    React.useEffect(() => {
        setAuthorIcon(greetConfig?.authorIcon || null);
        setIconType(
            greetConfig?.authorIcon?.startsWith("http")
                ? "url"
                : greetConfig?.authorIcon
        );
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
        setDisableButton(true);

        // TODO: backend call to save author icon

        setDisableButton(false);
    };

    return (
        <>
            <div className="greet-std-container">
                <p className="greet-title">Author Icon</p>
                <div className="greet-content">
                    <p>
                        <b>This will be shown if author is set.</b>
                        <br />
                        Select what image you want in greet embed author icon
                        field from given option down below.
                    </p>
                    {/* RADIO BUTTONS */}
                    <div className="embed-radio">
                        {Object.keys(typeMap).map((type) => (
                            <div className="embed-radio-pair">
                                <input
                                    type="radio"
                                    id={`embed-radio-${type}`}
                                    className={`embed-radio-input${
                                        type === "disable" ? "-disabled" : ""
                                    }`}
                                    name="embed-radio"
                                    value={type}
                                    checked={iconType === type}
                                    onChange={() => setIconType(type)}
                                />
                                <label
                                    htmlFor={`embed-radio-${type}`}
                                    className={`embed-radio-label${
                                        type === "disable" ? "-disabled" : ""
                                    }`}
                                    onClick={() => setIconType(type)}
                                >
                                    {iconType === type ? (
                                        <i>{type.toUpperCase() + " "}</i>
                                    ) : (
                                        <i>{type.toUpperCase()}</i>
                                    )}
                                </label>
                            </div>
                        ))}
                    </div>
                    <p className="embed-radio-desc">{`${typeMap[iconType]}`}</p>

                    {/* INPUT */}
                    {iconType === "url" && !addImage && (
                        <input
                            className="greet-image-input"
                            type="text-box"
                            placeholder="URL"
                            value={authorIcon}
                            onChange={(e) => {
                                const newAddonMsg = e.target.value;
                                setAuthorIcon(newAddonMsg);
                            }}
                            maxLength={1000}
                        />
                    )}

                    {iconType === "url" && addImage && (
                        <img
                            className="embed-icon"
                            src={authorIcon}
                            alt="greet"
                            onError={() => {
                                setAddImage(false);
                                setAuthorIcon("");
                                toast.error("Invalid image URL.");
                            }}
                            onLoad={() => {
                                setIconType("url");
                            }}
                        />
                    )}

                    {/* SAVE BUTTON */}
                    <div className="greet-pair">
                        <button
                            className="greet-apply"
                            onClick={handleIconToggle}
                            disabled={disableButton}
                        >
                            {iconType === "disable" ? "Enable" : "Add Image"}
                        </button>
                        <button
                            className="greet-apply"
                            onClick={handleIconSave}
                            disabled={disableButton}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthorIcon;
