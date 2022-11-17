import { useState } from "react";
import Image from "next/image";
import { BiTrash } from "react-icons/bi";
//import { useRouter } from "next/router";

import DOMPurify from "isomorphic-dompurify";

//import ContextMenu from "../contextMenu";
import MoreIcon from "../assets/more.svg";
import { BlockData } from "../models/BlockData";
import { PageData } from "../models/PageData";
import ContentEditable from "react-contenteditable";

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

interface BaseCardProps{
    page : PageData;
    deleteCard : (id : string) => Promise<void>;
}

const Card = (props : BaseCardProps) => {
    //console.log(props.page.name);
    //const router = useRouter();
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

    // In the card preview, we only want to show textual content
    //const textContent = props.page.blocks.filter((block:BlockData) => block.type !== "img");
    

    const toggleContextMenu = () => {
        console.log("Apertou os três pontos...");
        setIsContextMenuOpen(!isContextMenuOpen);
    };

    const deleteButtonClick = () => {
        //console.log("Botão deletar");
        props.deleteCard(props.page.id);
    }

    const closeContextMenu = () => {
        setIsContextMenuOpen(false);
    };

    return (
        <div className="relative w-5/6 h-auto m-2 mx-auto bg-gray-100 border border-gray-400 rounded-lg p-2">
            <div className="flex flex-row content-center">
                <a className="flex-1" href={`/p/${props.page.id}`}>
                    <article className="text-base font-regular text-appBase-800">
                        <ContentEditable className="m-2" html={props.page.name} onChange={() => {}} tagName={"h1"} disabled={true} />
                        <div className="relative overflow-hidden h-auto ">
                        </div>
                    </article>
                </a>
                {/* <span role="button" className="relative bottom-0 right-0 z-10 w-10 h-8 flex justify-center items-center" onClick={() => toggleContextMenu()} > 
                    <Image width={20} height={20} src={MoreIcon} alt="Icon" />
                </span> */}
                <span role="button" className="relative my-auto w-10 h-8 flex justify-center items-center" onClick={() => deleteButtonClick()} > 
                    <BiTrash />
                </span>
            </div>
        </div>
    );
};

export default Card;