import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

import Dropdown from "../../Dropdown/Dropdown";

import "./Setup.scss";

const Setup = () => {
    // const permissions = useSelector((state) => state.guild.permissions);
    const guildRoles = useSelector((state) => state.guild.roles);
    const guildConfig = useSelector((state) => state.guild.dbGeneralConfig);

    // const toastId = React.useRef(null);
    const [disableButton, setDisableButton] = useState(false);
    const [selectedRole, setSelectedRole] = useState(
        guildRoles.find((r) => r.id === guildConfig?.botManager)
    );
    const [requiredBoosts, setRequiredBoosts] = useState(
        guildConfig?.customRole
    );

    const incrementBoostRequired = () => setRequiredBoosts(requiredBoosts + 1);
    const decrementBoostRequired = () =>
        requiredBoosts > 0 ? setRequiredBoosts(requiredBoosts - 1) : null;

    return (
        <>
            <h1 className="setup-heading">Booster Bot Setup</h1>
            <div className="setup">
                {/* Bot Manager Setup Container */}
                <div className="setup-bot-manager">
                    <p className="setup-title">Bot Manager:</p>
                    <div className="setup-content">
                        <p>
                            Manager can edit bot settings via commands (if they
                            don't have access to dashbaord)
                        </p>
                        <Dropdown
                            className="guild-dropdown"
                            selected={selectedRole}
                            setSelected={setSelectedRole}
                            items={guildRoles
                                .filter((r) => r.name !== "@everyone")
                                .sort((a, b) => {
                                    return b.position - a.position;
                                })}
                            role={true}
                            clear={true}
                            disableButton={disableButton}
                        />
                    </div>
                </div>

                {/* Custom roles setup container */}
                <div className="setup-custom-role">
                    <p className="setup-title">Custom Role:</p>
                    {/* <div className="setup-custom-role-internal"> */}
                    <div className="setup-content">
                        <p>
                            To allow boosters to maintain their 1 personal role
                            (<i>they can edit role name, color, icon</i>) with{" "}
                            <b>bb role</b> command if they have required number
                            of boosts.
                        </p>

                        <div className="setup-custom-role-input">
                            <p className="setup-custom-role-input-info">
                                {requiredBoosts > 0 ? (
                                    <>
                                        <span>{requiredBoosts}</span> boosts
                                        required to claim custom role
                                    </>
                                ) : (
                                    <>
                                        <span>Disabled</span> no one can claim
                                        custom role
                                    </>
                                )}
                            </p>
                            <div className="setup-custom-role-input-icons">
                                <BiUpArrow
                                    className="setup-custom-role-input-icons-icon"
                                    onClick={incrementBoostRequired}
                                />
                                <BiDownArrow
                                    className="setup-custom-role-input-icons-icon"
                                    onClick={decrementBoostRequired}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Setup;
