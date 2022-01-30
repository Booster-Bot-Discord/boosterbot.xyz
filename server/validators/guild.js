require("dotenv").config();
const axios = require("axios");

const isChhannelValid = (channelID, channels) => {
    return channels.some(channel => channel.id === channelID);
}
const isRoleValid = (roleID, roles) => {
    return roles.some(role => role.id === roleID);
}

module.exports = {
    // validate fields and return new config object
    validateGuildConfig: async (guildID, config) => {
        const allowedFields = [
            "prefix",
            "color",
            "botManager",
            "systemChannel",
            // "addRoles",
            // "removeRoles",
            "baseRole",
            "giftConfig",
            "customRole",
            // "logChannel",
            // "logEvents",
            // "lvlRoles"
        ];
        const allowedFieldsSet = new Set(allowedFields);
        const configFields = Object.keys(config);
        const invalidFields = configFields.filter(field => !allowedFieldsSet.has(field));
        // delete invalid fields
        for (const field of invalidFields) {
            delete config[field];
        }

        // get guild data for validation
        const result = await axios({
            method: "get",
            url: `http://localhost:3000/guilds/${guildID}`
        }).catch(err => {
            console.log(err);
            throw new Error("Could not get guild data");
        });
        const guildData = result.data;

        // validate prefix
        if (config.prefix && (typeof config.prefix !== "string" || (config.prefix.length < 1 || config.prefix.length > 20))) {
            throw new Error("Invalid prefix.");
        }
        // validate color
        if (config.color && (typeof config.color !== "string" || !/^#[0-9A-F]{6}$/i.test(config.color))) {
            throw new Error("Invalid color.");
        }
        // validate botManager
        if (config.botManager && (typeof config.botManager !== "string" || !isRoleValid(config.botManager, guildData.roles))) {
            throw new Error("Invalid bot manager.");
        }

        // validate systemChannel
        if (config.systemChannel && (typeof config.systemChannel !== "string" || !isChhannelValid(config.systemChannel, guildData.channels))) {
            if (config.systemChannel === "0" || config.systemChannel === "disabled") {
                config.systemChannel = null;
            } else {
                throw new Error("Invalid system channel.");
            }
        }

        // validate baseRole
        if (config.baseRole && (typeof config.baseRole !== "string" || !isRoleValid(config.baseRole, guildData.roles))) {
            throw new Error("Invalid base role.");
        }

        // validate giftConfig
        if (config.giftConfig && (typeof config.giftConfig !== "object" || config.giftConfig.length !== 2)) {
            throw new Error("Invalid gift config.");
        }
        if (config.giftConfig[0] === 0 || config.giftConfig[1] === 0) {
            config.giftConfig = [0, 0];
        }
        if (typeof config.giftConfig[0] !== 'number' || typeof config.giftConfig[1] !== 'number' ||
            config.giftConfig[0] < 0 || config.giftConfig[1] < 0
        ) {
            throw new Error("Invalid gift config.");
        }

        // validate customRole
        if (config.customRole && (typeof config.customRole !== "number" || config.customRole < 0)) {
            throw new Error("Invalid custom role.");
        }

        // validate logChannel
        if (config.logChannel && (typeof config.logChannel !== "string" || !isChhannelValid(config.logChannel, guildData.channels))) {
            if (config.logChannel === "0" || config.logChannel === "disabled") {
                config.logChannel = null;
            }
            else {
                throw new Error("Invalid log channel.");
            }
        }

        return config;
    },
    validateGreetConfig: async (guildID, config) => {
        const allowedFields = [
            "dm",
            "addon",
            "color",
            "author",
            "authorIcon",
            "title",
            "messages",
            "footer",
            "footerIcon",
            "channel",
            "images",
            "isEmbed",
            "stats",
            "thumbnail"
        ];
        const allowedFieldsSet = new Set(allowedFields);
        const configFields = Object.keys(config);
        const invalidFields = configFields.filter(field => !allowedFieldsSet.has(field));
        // delete invalid fields
        for (const field of invalidFields) {
            delete config[field];
        }

        // get guild data for validation
        const result = await axios({
            method: "get",
            url: `http://localhost:3000/guilds/${guildID}`
        }).catch(err => {
            console.log(err);
            throw new Error("Could not get guild data");
        });
        const guildData = result.data;

        // validate dm
        if (config.dm && (typeof config.dm !== "boolean")) {
            throw new Error("Invalid dm.");
        }
        // validate addon
        if (config.addon && (typeof config.addon !== "string" || config.addon.length < 1 || config.addon.length > 2000)) {
            throw new Error("Invalid addon.");
        }
        // validate color
        if (config.color && (typeof config.color !== "object" || !/^#[0-9A-F]{6}$/i.test(config.color[0]))) {
            throw new Error("Invalid color.");
        }

        // validate author
        if (config.author && (typeof config.author !== "string" || config.author.length < 1 || config.author.length > 1000)) {
            throw new Error("Invalid author.");
        }
        // validate authorIcon
        if (config.authorIcon && (typeof config.authorIcon !== "string" || config.authorIcon.length < 1 || config.authorIcon.length > 1000)) {
            throw new Error("Invalid author icon.");
        }

        // validate title
        if (config.title && (typeof config.title !== "string" || config.title.length < 1 || config.title.length > 1000)) {
            throw new Error("Invalid title.");
        }

        /*****/
        // TODO: PREMIUM CHECK
        /*****/
        // validate messages
        if (config.messages && (typeof config.messages !== "object" || config.messages.length < 1 || config.messages.length >= 10)) {
            throw new Error("Invalid messages.");
        }
        for (const message of config.messages) {
            if (typeof message !== "string" || message.length < 1 || message.length > 2000) {
                throw new Error("Invalid message.");
            }
        }

        // validate footer
        if (config.footer && (typeof config.footer !== "string" || config.footer.length < 1 || config.footer.length > 1000)) {
            throw new Error("Invalid footer.");
        }
        // validate footerIcon
        if (config.footerIcon && (typeof config.footerIcon !== "string" || config.footerIcon.length < 1 || config.footerIcon.length > 1000)) {
            throw new Error("Invalid footer icon.");
        }

        // validate channel
        if (config.channel && (typeof config.channel !== "string" || !isChhannelValid(config.channel, guildData.channels))) {
            if (config.channel === "0" || config.channel === "disabled") {
                config.channel = null;
            }
            else {
                throw new Error("Invalid channel.");
            }
        }

        /*****/
        // TODO: PREMIUM CHECK
        /*****/
        // validate images
        if (config.images && (typeof config.images !== "object" || config.images.length < 1 || config.images.length >= 10)) {
            throw new Error("Invalid images.");
        }
        for (const image of config.images) {
            if (typeof image !== "string" || image.length < 1 || image.length > 2000) {
                throw new Error("Invalid image.");
            }
        }

        // validate isEmbed
        if (config.isEmbed && (typeof config.isEmbed !== "boolean")) {
            throw new Error("Invalid isEmbed.");
        }
        // validate stats
        if (config.stats && (typeof config.isEmbed !== "boolean")) {
            throw new Error("Invalid stats.");
        }
        // validate thumbnail
        if (config.thumbnail && (typeof config.thumbnail !== "string" || config.thumbnail.length < 1 || config.thumbnail.length > 2000)) {
            if (!config.thumbnail.length || config.thumbnail === "disabled") {
                config.thumbnail = null;
            }
            throw new Error("Invalid thumbnail.");
        }

        return config;
    },
};