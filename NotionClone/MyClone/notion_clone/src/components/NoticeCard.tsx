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
        <div className="" >
            {props.dismissible && (
                <span role="button" className="" onClick={() => setIsVisible(false)}>
                    <Image src={CloseIcon} alt="close icon" />
                </span>
                )
            }
            {props.children}
        </div>
    );
}


