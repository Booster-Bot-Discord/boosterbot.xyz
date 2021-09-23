import { getGuildData, getGuildConfig, getGuildChannels } from '../api';
import {
    setAvailable,
    setDiscordId,
    setName,
    setIcon,
    setRoles,
    setEmojis,
    setChannels,
    setConfig,
    setMemberCount,
    setPresenceCount
} from '../store/guildSlice';
import { useDispatch } from 'react-redux';

export const useGuildData = () => {
    const dispatch = useDispatch();

    return function (guildId) {
        // store guild info from discord
        getGuildData(guildId)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setAvailable(true));
                    dispatch(setDiscordId(res.data.id));
                    dispatch(setName(res.data.name));
                    dispatch(setIcon(res.data.icon));
                    dispatch(setMemberCount(res.data.approximate_member_count));
                    dispatch(setPresenceCount(res.data.approximate_presence_count));
                    dispatch(setRoles(res.data.roles));
                    dispatch(setEmojis(res.data.emojis));
                }
            }).catch(err => {
                console.log(err);
            });

        // store guild channels from discord
        getGuildChannels(guildId)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setChannels(res.data));
                }
            }).catch(err => {
                console.log(err);
            });

        // store guild config from database
        getGuildConfig(guildId)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setConfig(res.data));
                }
            }).catch(err => {
                console.log(err);
            });
    }
}
