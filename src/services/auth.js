import { authCheck, logout } from '../api';
import {
    authenticate,
    deauthenticate,
    setId,
    setDiscordId,
    setPermissionLevel,
    setUsername,
    setAvatar
} from '../store/userSlice';
import { useDispatch } from 'react-redux';

export const useDiscordLogin = () => {
    return function () {
        window.open(`http://localhost:4000/api/v1/auth/discord`, "_self");
    }
}

export const useAuthCheck = () => {
    const dispatch = useDispatch();

    return function () {
        authCheck()
            .then(res => {
                if (res.status === 200) {
                    dispatch(authenticate());
                    dispatch(setId(res.data.id));
                    dispatch(setDiscordId(res.data.discordId));
                    dispatch(setUsername(res.data.username));
                    dispatch(setAvatar(res.data.avatar));
                    dispatch(setPermissionLevel(res.data.permissionLevel));
                }
            })
            .catch(err => {
                // Do nothing.
            });
    }
}

export const useLogout = () => {
    const dispatch = useDispatch();

    return function () {
        logout()
            .then(res => {
                dispatch(deauthenticate());
                dispatch(setId(""));
                dispatch(setDiscordId(""));
                dispatch(setUsername(""));
                dispatch(setAvatar(""));
                dispatch(setPermissionLevel(1));
            })
            .catch(err => {
                console.error(err.response);
            });
    }
}