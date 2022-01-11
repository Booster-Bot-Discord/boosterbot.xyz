import React, { useState } from "react";
import { ImCross } from "react-icons/im";

import "./Dropdown.scss";

function Dropdown({
    selected,
    setSelected,
    items,
    channel = false,
    role = false,
    apply = false,
    clear = false,
    disableButton = false,
    onApply,
}) {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    const handleOnClick = (item) => {
        setSelected(item);
        setOpen(false);
    };

    const onClear = (e) => {
        setSelected(null);
        setOpen(false);
        e.stopPropagation();
    };

    const getHex = (r) => {
        const hex = r.color.toString(16);
        return hex === "0" ? "95a5a6" : hex;
    };

    return (
        <div className="dd-wrapper">
            <div className="dd-header">
                <div
                    className="dd-header-title"
                    onKeyPress={() => toggle()}
                    onClick={() => toggle()}
                >
                    <p
                        className={role && "dd-role"}
                        style={{
                            border:
                                selected &&
                                role &&
                                `2px solid #${getHex(selected)}`,
                            minWidth: role && "50%",
                            textAlign: role && "center",
                        }}
                    >
                        {channel && selected && "#"}
                        {role && selected && (
                            <div
                                className="dd-role-badge"
                                style={{
                                    backgroundColor: `#${getHex(selected)}`,
                                }}
                            />
                        )}
                        {selected?.name || "-- disabled --"}
                    </p>
                    {clear && selected && (
                        <ImCross
                            disabled={disableButton}
                            onClick={onClear}
                            className="dd-header-clear"
                        >
                            Clear
                        </ImCross>
                    )}
                </div>
                {apply && (
                    <button
                        disabled={disableButton}
                        onClick={onApply}
                        className="dd-header-apply"
                    >
                        Save
                    </button>
                )}

                {open && (
                    <div className="dd-list">
                        {items.map((item) => (
                            <div
                                className={`dd-list-item
                                    ${role && "dd-list-item-role"}
                                    ${channel && "dd-list-item-channel"}
                                `}
                                key={item.id}
                                onClick={() => handleOnClick(item)}
                            >
                                <p
                                    className={role && "dd-role"}
                                    style={{
                                        border:
                                            role &&
                                            `2px solid #${getHex(item)}`,
                                        minWidth: role && "50%",
                                        textAlign: role && "center",
                                        color: role && `#${getHex(item)}`,
                                    }}
                                >
                                    {channel && "#"}
                                    {role && (
                                        <div
                                            className="dd-role-badge"
                                            style={{
                                                backgroundColor: `#${getHex(
                                                    item
                                                )}`,
                                            }}
                                        />
                                    )}
                                    {item.name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dropdown;
