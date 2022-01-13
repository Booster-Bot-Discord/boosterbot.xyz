import React from "react";
import { toast } from "react-toastify";

import "../Embed.scss";

function Radio({
    typeMap = {},
    prefix,
    iconType,
    setIconType,
    icon,
    setIcon,
    addImage,
    setAddImage,
    handleIconToggle,
    handleIconSave,
    disableButton = false,
}) {
    const buttonText = addImage ? "Edit Image" : "Add Image";

    return (
        <>
            {/* RADIO BUTTONS */}
            <div className="embed-radio">
                {Object.keys(typeMap).map((type) => (
                    <div className="embed-radio-pair">
                        <input
                            type="radio"
                            id={`embed-radio-${type}`}
                            className={`embed-radio-input${
                                type === prefix + "disable" ? "-disabled" : ""
                            }`}
                            name={"embed-radio" + prefix}
                            value={type}
                            checked={iconType === type.substring(2)}
                            onChange={() => setIconType(type.substring(2))}
                        />
                        <label
                            htmlFor={`embed-radio-${type}`}
                            className={`embed-radio-label${
                                type === "disable" ? "-disabled" : ""
                            }`}
                            onClick={() => setIconType(type.substring(2))}
                        >
                            {iconType === type ? (
                                <i>{type.substring(2).toUpperCase() + " "}</i>
                            ) : (
                                <i>{type.substring(2).toUpperCase()}</i>
                            )}
                        </label>
                    </div>
                ))}
            </div>

            {/* MESSAGE FROM TYPE MAP */}
            <p className="embed-radio-desc">{typeMap[prefix + iconType]}</p>

            {/* INPUT */}
            {iconType === "url" && !addImage && (
                <input
                    className="greet-image-input"
                    type="text-box"
                    placeholder="URL"
                    value={icon}
                    onChange={(e) => {
                        const newAddonMsg = e.target.value;
                        setIcon(newAddonMsg);
                    }}
                    maxLength={1000}
                />
            )}

            {/* SAVE BUTTON */}
            <div className="greet-pair">
                {iconType === "url" && prefix !== "t_" && addImage && (
                    <img
                        className="embed-icon"
                        src={icon}
                        alt="greet"
                        onError={() => {
                            setAddImage(false);
                            setIcon("");
                            toast.error("Invalid image URL.");
                        }}
                        onLoad={() => {
                            setIconType("url");
                        }}
                    />
                )}

                <button
                    className="greet-apply"
                    onClick={handleIconToggle}
                    disabled={disableButton}
                >
                    {iconType === "disable" ? "Enable" : buttonText}
                </button>
                <button
                    className="greet-apply"
                    onClick={handleIconSave}
                    disabled={disableButton}
                >
                    Save
                </button>
            </div>
        </>
    );
}

export default Radio;
