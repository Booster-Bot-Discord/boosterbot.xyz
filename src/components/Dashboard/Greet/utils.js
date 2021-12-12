export const checkImage = async (url) => {
    const res = await fetch(url);
    const buff = await res.blob();

    return buff.type.startsWith("image/")
}
