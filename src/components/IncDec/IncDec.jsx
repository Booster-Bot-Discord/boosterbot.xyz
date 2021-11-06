import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";

import "./IncDec.scss";

const IncDec = ({ title = "", value = 0, setValue }) => (
    <>
        <div className="inc-dec">
            {title && <p className="inc-dec-title">{title}</p>}

            <div className="inc-dec-input">
                <p className={value > 0 ? "inc-dec-input-info" : "inc-dec-input-zero"}>
                    {value > 0 ? <p>{value}</p> : <p>Disabled</p>}
                </p>

                <div className="inc-dec-input-icons">
                    <IoMdArrowDropupCircle
                        className="inc-dec-input-icons-icon"
                        onClick={() => setValue(value + 1)}
                    />
                    <IoMdArrowDropdownCircle
                        className="inc-dec-input-icons-icon"
                        onClick={() => value > 0 && setValue(value - 1)}
                    />
                </div>
            </div>
        </div>
    </>
);

export default IncDec;
