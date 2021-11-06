import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

import IncDec from "../../IncDec/IncDec";
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
    const [requiredBoostsForCustomRole, setRequiredBoostsForCustomRole] =
        useState(guildConfig?.customRole || 0);
    const [giftsAllowed, setGiftsAllowed] = useState(
        guildConfig?.giftConfig[0] || 0
    );
    const [requiredBoostsForGifts, setRequiredBoostsForGifts] = useState(
        guildConfig?.giftConfig[1] || 0
    );

    // Sync gifts values
    useEffect(() => {
        if (giftsAllowed === 0) setRequiredBoostsForGifts(0);
    }, [giftsAllowed]);
    useEffect(() => {
        if (requiredBoostsForGifts === 0) setGiftsAllowed(0);
    }, [requiredBoostsForGifts]);

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
                            apply={true}
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

                        <div className="setup-inputs">
                            <IncDec
                                title="Boosts Required to claim custom role"
                                value={requiredBoostsForCustomRole}
                                setValue={setRequiredBoostsForCustomRole}
                            />
                            <button className="setup-custom-role-apply">
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                {/* Gifts setup container */}
                <div className="setup-gifts">
                    <p className="setup-title">Gifts:</p>
                    <div className="setup-content">
                        <p>
                            Allow boosters to GIFT their personal role to
                            specified number of friends if they have required
                            number of boosts with <b>bb gift</b> command.
                        </p>
                        <div className="setup-inputs">
                            <div>
                                <IncDec
                                    title="Allowed Gifts"
                                    value={giftsAllowed}
                                    setValue={setGiftsAllowed}
                                />
                            </div>
                            <div>
                                <IncDec
                                    title="Required boosts"
                                    value={requiredBoostsForGifts}
                                    setValue={setRequiredBoostsForGifts}
                                />
                            </div>
                            <button className="setup-gifts-apply">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Setup;
