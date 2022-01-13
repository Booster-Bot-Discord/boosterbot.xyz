import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "../Embed.scss";

const Color = ({ disableButton, setDisableButton }) => {
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const [color, setColor] = React.useState(greetConfig?.color || ["#F47FFF"]);

    // Sync greet images
    React.useEffect(() => {
        setColor(greetConfig?.color || ["#F47FFF"]);
    }, [greetConfig]);

    // handle color change
    const handleColorChange = (e) => {
        setColor([e.target.value]);
    };

    // handle color save
    const handleColorSave = () => {
        console.log("color", color);

        setDisableButton(true);
        toast.info("Saving...");

        // TODO: Save color backend call

        setDisableButton(false);
    };

    return (
        <>
            <div className="greet-std-container">
                <p className="greet-title">Embed Color</p>
                <div className="greet-content">
                    <p>
                        {!color?.length ? (
                            <>
                                <b>Embed Color is disabled</b>
                                <br />
                                Bot will use a default boost color for greet
                                embed color.
                            </>
                        ) : (
                            <>
                                <b>This color is only for greet embed</b>
                                <br />
                                Select what color you want greet embed to be.
                                <br />
                                Check setup tag to select color for command
                                response embed.
                            </>
                        )}
                    </p>

                    <div className="greet-inputs">
                        {!color ? (
                            <button
                                className="greet-apply"
                                onClick={() =>
                                    setColor([greetConfig?.color || "#F47FFF"])
                                }
                            >
                                Enable
                            </button>
                        ) : (
                            <div className="embed-color-input">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={handleColorChange}
                                    className="embed-color-input-color"
                                    maxLength={7}
                                />
                                <input
                                    type="text"
                                    value={color}
                                    readOnly={true}
                                    className="embed-color-input-text"
                                    maxLength={7}
                                />
                                <button
                                    className="greet-apply"
                                    onClick={() => setColor(null)}
                                >
                                    Disable
                                </button>
                            </div>
                        )}
                        <button
                            className="greet-apply"
                            onClick={handleColorSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Color;
