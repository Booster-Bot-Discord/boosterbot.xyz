import { getGuildData, getGuildConfig } from '../api';
import {
    setAvailable,
    setDiscordId,
    setName,
    setIcon,
    setMemberCount,
    setPermissions,
    setHighRolePosition,
    setRoles,
    setChannels,
    setDbGeneralConfig,
    setDbGreetConfig,
    setDbBoostersData
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
                    dispatch(setPermissions(res.data.permissions));
                    dispatch(setHighRolePosition(res.data.highestRolePosition));
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
                    dispatch(setDbGeneralConfig(res.data.dbGeneraConfig));
                    dispatch(setDbGreetConfig(res.data.dbGreetConfig));
                    dispatch(setDbBoostersData(res.data.dbBoostersData));
                }
            }).catch(err => {
                console.log(err);
            });
    }
}
