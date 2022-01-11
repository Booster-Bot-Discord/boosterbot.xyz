import React from "react";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "./Embed.scss";

const Author = ({ disableButton, setDisableButton }) => {
    const dispatch = useDispatch();
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const toastId = React.useRef(null);
    const [newImageURL, setNewImageURL] = React.useState("");

    const [images, setImages] = React.useState(greetConfig?.author || []);

    // Sync greet images
    React.useEffect(() => {
        setImages(greetConfig?.images || []);
    }, [greetConfig]);

    // image add handling
    const handleImageAdd = () => {
        const newImages = [...images];
        newImages.push(newImageURL);
        setImages(newImages);
        setNewImageURL("");
    };

    return (
        <>
            <div className="greet-std-container">
                
            </div>
        </>
    );
};

export default Author;
