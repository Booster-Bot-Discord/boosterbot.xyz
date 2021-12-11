export const getUpdatedConfig = (config, newConfig) => {
    const updatedConfig = { ...config };
    Object.keys(newConfig).forEach(key => {
        updatedConfig[key] = newConfig[key];
    });
    return updatedConfig;
}
