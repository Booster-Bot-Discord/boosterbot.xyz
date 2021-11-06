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
    const [botManagerRole, setBotManagerRole] = useState(
        guildConfig?.botManager
            ? guildRoles.find((r) => r.id === guildConfig?.botManager)
            : null
    );
    const [baseRole, setBaseRole] = useState(
        guildConfig?.baseRole
            ? guildRoles.find((r) => r.id === guildConfig?.baseRole)
            : null
    );
    const [requiredBoostsForCustomRole, setRequiredBoostsForCustomRole] =
        useState(guildConfig?.customRole || 0);
    const [giftsAllowed, setGiftsAllowed] = useState(
        guildConfig?.giftConfig?.length ? guildConfig?.giftConfig[0] : 0
    );
    const [requiredBoostsForGifts, setRequiredBoostsForGifts] = useState(
        guildConfig?.giftConfig?.length ? guildConfig?.giftConfig[1] : 0
    );
    const [color, setColor] = useState(guildConfig?.color || "#2f3136");

    // Sync gifts values
    useEffect(() => {
        if (giftsAllowed === 0) setRequiredBoostsForGifts(0);
        else if (giftsAllowed === 1 && requiredBoostsForGifts === 0)
            setRequiredBoostsForGifts(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [giftsAllowed]);
    useEffect(() => {
        if (requiredBoostsForGifts === 0) setGiftsAllowed(0);
        else if (requiredBoostsForGifts === 1 && giftsAllowed === 0)
            setGiftsAllowed(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requiredBoostsForGifts]);

    // handle color change event
    const colorChange = (e) => {
        setColor(e.target.value);
    };

    return (
        <>
            <h1 className="setup-heading">Booster Bot Setup</h1>
            <div className="setup">
                {/* Bot Manager Setup Container */}
                <div className="setup-std-container">
                    <p className="setup-title">Bot Manager:</p>
                    <div className="setup-content">
                        <p>
                            Manager can edit bot settings via commands (if they
                            don't have access to dashbaord)
                        </p>
                        <Dropdown
                            selected={botManagerRole}
                            setSelected={setBotManagerRole}
                            items={guildRoles
                                .filter(
                                    (r) => r.name !== "@everyone" && !r.tags
                                )
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
                <div className="setup-std-container">
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
                            <button className="setup-apply">Apply</button>
                        </div>
                    </div>
                </div>

                {/* Gifts setup container */}
                <div className="setup-std-container">
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
                            <button className="setup-apply">Apply</button>
                        </div>
                    </div>
                </div>

                {/* Base Role setup container */}
                <div className="setup-std-container">
                    <p className="setup-title">Base Role:</p>
                    <div className="setup-content">
                        <p>
                            Bot will assign custom-role just above this role so
                            that booster's name will appear in color of their
                            custom role.
                        </p>
                        {requiredBoostsForCustomRole > 0 ? (
                            <Dropdown
                                selected={baseRole}
                                setSelected={setBaseRole}
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
                        ) : (
                            <p className="setup-base-role-disabled">
                                Enable custom roles to setup base-role for the
                                custom roles.
                            </p>
                        )}
                    </div>
                </div>

                {/* Color setup container */}
                <div className="setup-std-container">
                    <p className="setup-title">Color:</p>
                    <div className="setup-content">
                        <p>
                            Bot will use this color in all command embeds and
                            image accent color (
                            <i>except for greet and logs embed colors </i> ).
                        </p>
                        <div className="setup-inputs">
                            <div className="setup-color-input">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={colorChange}
                                    className="setup-color-input-color"
                                />
                                <input
                                    type="text"
                                    value={color}
                                    className="setup-color-input-text"
                                />
                            </div>
                            <button className="setup-apply">Apply</button>
                        </div>
                    </div>
                </div>

                {/* Premium reminder container */}
                <div className="setup-std-container">
                    <p className="setup-title">⭐ Premium Reminder:</p>
                    <div className="setup-content">
                        <p>
                            Get premium now from patreon or by{" "}
                            <b>
                                <a
                                    rel="noreferrer"
                                    target="_blank"
                                    href="https://boosterbot.xyz/vote"
                                >
                                    voting
                                </a>{" "}
                            </b>
                            bot to support booster bot and get amazing features
                            listed in <b>bb premium</b> command.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Setup;
