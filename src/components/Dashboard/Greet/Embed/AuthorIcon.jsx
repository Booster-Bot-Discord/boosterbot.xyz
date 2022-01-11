import React from "react";
import { ImCross } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "./Embed.scss";

const AuthorIcon = ({ disableButton, setDisableButton }) => {
    const dispatch = useDispatch();
    const greetConfig = useSelector((state) => state.guild.dbGreetConfig);

    const toastId = React.useRef(null);
    const [newImageURL, setNewImageURL] = React.useState("");

    const [images, setImages] = React.useState(greetConfig?.authorIcon || []);

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
                <p className="greet-title">Greet Images:</p>
                <div className="greet-content">
                    <p>
                        Bot will send a random image from when someone will
                        boost the server. You can add upto 10 images with
                        premium and 2 images for free.
                    </p>
                    {/* show images */}
                    {images.length > 0 && (
                        <div className="greet-images">
                            {images.map((image, index) => (
                                <div className="greet-image" key={index}>
                                    <img
                                        src={image}
                                        alt="greet"
                                        onError={() => {
                                            const newImages = [...images];
                                            newImages.splice(index, 1);
                                            setImages(newImages);
                                            toast.error(
                                                "Image URL is invalid."
                                            );
                                        }}
                                    />
                                    <ImCross
                                        disabled={disableButton}
                                        onClick={() => {
                                            const newImages = [...images];
                                            newImages.splice(index, 1);
                                            setImages(newImages);
                                        }}
                                        className="greet-image-clear"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    {/* button to add new image url */}
                    {!images.length && (
                        <p className="greet-content">
                            <b>Greet Images are disabled.</b>
                        </p>
                    )}
                    <div className="greet-image-input-wrapper">
                        <input
                            className="greet-image-input"
                            type="text"
                            placeholder="Image URL"
                            value={newImageURL}
                            onChange={(e) => {
                                setNewImageURL(e.target.value);
                            }}
                        />
                        <div className="greet-image-input-wrapper-buttons">
                            <button
                                disabled={disableButton}
                                onClick={handleImageAdd}
                                className="greet-image-input-wrapper-buttons-button"
                            >
                                Add Image
                            </button>
                            <button
                                disabled={disableButton}
                                onClick={handleImageAdd}
                                className="greet-image-input-wrapper-buttons-button"
                            >
                                Save Images
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthorIcon;
