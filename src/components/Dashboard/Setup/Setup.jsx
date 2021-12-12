import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setDbGeneralConfig } from "../../../store/guildSlice";
import { updateGuildConfig } from "../../../api/index";
import { getUpdatedConfig } from "./utils";

import IncDec from "../../IncDec/IncDec";
import Dropdown from "../../Dropdown/Dropdown";

import "./Setup.scss";

const Setup = () => {
    const dispatch = useDispatch();
    const permissions = useSelector((state) => state.guild.permissions);
    const guildId = useSelector((state) => state.guild.discordId);
    const guildRoles = useSelector((state) => state.guild.roles);
    const guildConfig = useSelector((state) => state.guild.dbGeneralConfig);
    const highestRole = useSelector((state) => state.guild.highestRolePosition);

    const toastId = React.useRef(null);
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
    const [color, setColor] = useState(guildConfig?.color || null);

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

    // Update guild config states
    React.useEffect(() => {
        setBotManagerRole(
            guildConfig?.botManager
                ? guildRoles.find((r) => r.id === guildConfig?.botManager)
                : null
        );
        setBaseRole(
            guildConfig?.baseRole
                ? guildRoles.find((r) => r.id === guildConfig?.baseRole)
                : null
        );
        setRequiredBoostsForCustomRole(guildConfig?.customRole || 0);
        setGiftsAllowed(
            guildConfig?.giftConfig?.length ? guildConfig?.giftConfig[0] : 0
        );
        setRequiredBoostsForGifts(
            guildConfig?.giftConfig?.length ? guildConfig?.giftConfig[1] : 0
        );
        setColor(guildConfig?.color || null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guildConfig]);

    // handle color change event
    const colorChange = (e) => {
        setColor(e.target.value);
    };

    // reusable error handler
    const handleError = (error) => {
        toast.update(toastId.current, {
            render: error.message,
            type: toast.TYPE.ERROR,
            autoClose: 5000,
        });
        setDisableButton(false);
    };
    const updateConfig = (newGuildConfig, msg) => {
        updateGuildConfig(guildId, newGuildConfig)
            .then(() => {
                dispatch(setDbGeneralConfig(newGuildConfig));
                toast.update(toastId.current, {
                    render: msg,
                    type: toast.TYPE.SUCCESS,
                    autoClose: 5000,
                });
                setDisableButton(false);
            })
            .catch((err) => handleError(err));
    };

    // handle bot manager update apply
    const changeBotManager = () => {
        if (!permissions.MANAGE_ROLES) {
            return toast.warn("Bot do not have permission to MANAGE ROLES.");
        }
        if (guildConfig?.botManager === botManagerRole?.id) {
            return toast.warn(
                `Bot Manager is already set to ${botManagerRole.name}`
            );
        }
        setDisableButton(true);
        toastId.current = toast.info("Changing Bot Manager...", {
            autoClose: false,
        });
        const newGuildConfig = getUpdatedConfig(guildConfig, {
            botManager: botManagerRole ? botManagerRole.id : null,
        });
        updateConfig(newGuildConfig, "Bot manager updated!");
    };

    // handle custom role update apply
    const changeCustomRole = () => {
        if (!permissions.MANAGE_ROLES) {
            return toast.warn("Bot do not have permission to MANAGE ROLES.");
        }
        if (guildConfig?.customRole === requiredBoostsForCustomRole) {
            return toast.warn(
                `Custom Role already requires ${requiredBoostsForCustomRole} ${
                    requiredBoostsForCustomRole > 1 ? "boosts" : "boost"
                }`
            );
        }
        setDisableButton(true);
        toastId.current = toast.info("Changing Custom Role Boosts...", {
            autoClose: false,
        });
        const newGuildConfig = getUpdatedConfig(guildConfig, {
            customRole: requiredBoostsForCustomRole,
        });
        updateConfig(newGuildConfig, "Custom role updated!");
    };

    // handle gifts update apply
    const changeGifts = () => {
        if (!permissions.MANAGE_ROLES) {
            return toast.warn("Bot do not have permission to MANAGE ROLES.");
        }
        if (guildConfig?.giftConfig?.length) {
            if (
                guildConfig?.giftConfig[0] === giftsAllowed &&
                guildConfig?.giftConfig[1] === requiredBoostsForGifts
            ) {
                return toast.warn(
                    `Already ${giftsAllowed} ${
                        giftsAllowed > 1 ? "gifts" : "gift"
                    } allowed for ${requiredBoostsForGifts} ${
                        requiredBoostsForGifts > 1 ? "boosts" : "boost"
                    }`
                );
            }
        } else if (giftsAllowed === 0) {
            return toast.warn("Gifts are already disabled");
        }
        setDisableButton(true);
        toastId.current = toast.info("Changing Gift Settings...", {
            autoClose: false,
        });
        const newGuildConfig = getUpdatedConfig(guildConfig, {
            giftConfig: [giftsAllowed, requiredBoostsForGifts],
        });
        updateConfig(newGuildConfig, "Gift Settings updated!");
    };

    // handle base role update apply
    const changeBaseRole = () => {
        if (!permissions.MANAGE_ROLES) {
            return toast.warn("Bot do not have permission to MANAGE ROLES.");
        }
        if (highestRole < baseRole?.position) {
            return toast.warn(
                `Base Role can not be higher than bot's highest role.`
            );
        }
        if (guildConfig?.botManager === baseRole?.id) {
            return toast.warn(`Base role is already set to ${baseRole.name}`);
        }
        setDisableButton(true);
        toastId.current = toast.info("Changing Base Role...", {
            autoClose: false,
        });
        const newGuildConfig = getUpdatedConfig(guildConfig, {
            baseRole: baseRole ? baseRole.id : null,
        });
        updateConfig(newGuildConfig, "Base Role updated!");
    };

    // handle color update apply
    const changeColor = () => {
        if (!permissions.MANAGE_ROLES) {
            return toast.warn("Bot do not have permission to MANAGE ROLES.");
        }
        if (guildConfig?.color === color) {
            return toast.warn(`Color is already set to ${color}`);
        }
        setDisableButton(true);
        toastId.current = toast.info("Changing Color...", {
            autoClose: false,
        });
        const newGuildConfig = getUpdatedConfig(guildConfig, { color });
        updateConfig(newGuildConfig, "Color updated!");
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
                            onApply={changeBotManager}
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
                            <button
                                className="setup-apply"
                                onClick={changeCustomRole}
                            >
                                Apply
                            </button>
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
                            <button
                                className="setup-apply"
                                onClick={changeGifts}
                            >
                                Apply
                            </button>
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
                                onApply={changeBaseRole}
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
                            {!color ? (
                                <button
                                    className="setup-apply"
                                    onClick={() => setColor("#2f3136")}
                                >
                                    Enable
                                </button>
                            ) : (
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
                                    <button
                                        className="setup-apply"
                                        onClick={() => setColor(null)}
                                    >
                                        Disable
                                    </button>
                                </div>
                            )}
                            <button
                                className="setup-apply"
                                onClick={changeColor}
                            >
                                Apply
                            </button>
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
