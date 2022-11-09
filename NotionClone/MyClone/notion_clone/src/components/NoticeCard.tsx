import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

import CloseIcon from "../assets/close.svg";

interface NoticeProps{
    children: any;
    dismissible?: boolean
}

const Notice = (props : NoticeProps) => {
    const [isVisible, setIsVisible] = useState(true);
    return  isVisible ? getNotice(props, setIsVisible) : null;
};

export default Notice;

function getNotice(props : NoticeProps, setIsVisible: Dispatch<SetStateAction<boolean>>){
    return (
        <div className="relative w-96 mx-auto my-4 bg-appBase-500 border-2 rounded-lg text-orange-600 p-2 items-end" >
            {props.dismissible && (
                <span role="button" className="content-center w-6 h-6 items-center flex" onClick={() => setIsVisible(false)}>
                    <Image src={CloseIcon} alt="close icon" />
                </span>
                )}
            {props.children}
        </div>
    );
}


