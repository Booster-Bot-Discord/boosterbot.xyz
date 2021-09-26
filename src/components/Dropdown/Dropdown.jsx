import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";

import "./Dropdown.scss";

function Dropdown({
    selected,
    setSelected,
    items,
    channel = false,
    role = false,
    apply = false,
    disableButton = false,
    onApply,
}) {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    Dropdown.handleClickOutside = () => setOpen(false);

    const handleOnClick = (item) => {
        setSelected(item);
        setOpen(false);
    }

    return (
        <div className="dd-wrapper">
            <div className="dd-header">
                <p
                    className="dd-header-title"
                    onKeyPress={() => toggle()}
                    onClick={() => toggle()}
                >
                    {channel && selected && "#"}
                    {selected?.name || "<-- select -->"}
                </p>
                {apply && (
                    <button
                        disabled={disableButton}
                        onClick={onApply}
                        className="dd-header-action"
                    >
                        Apply
                    </button>
                )}

                {open && (
                    <div className="dd-list">
                        {items.map((item) => (
                            <div
                                className="dd-list-item"
                                key={item.id}
                                onClick={() => handleOnClick(item)}
                            >
                                <p>
                                    {channel && "#"}
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

const clickOutsideConfig = {
    handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
