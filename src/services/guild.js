import { getGuildData, getGuildConfig } from '../api';
import {
    setAvailable,
    setDiscordId,
    setName,
    setIcon,
    setRoles,
    setChannels,
    setConfig,
    setMemberCount
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
                    dispatch(setMemberCount(res.data.memberCount));
                    dispatch(setChannels(
                        res.data.channels.sort((a, b) => {
                            return a.position - b.position;
                        })
                    ));
                    dispatch(setRoles(res.data.roles));
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
