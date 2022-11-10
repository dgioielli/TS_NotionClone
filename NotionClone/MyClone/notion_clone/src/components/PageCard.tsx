import { useState } from "react";
import Image from "next/image";
//import { useRouter } from "next/router";

import DOMPurify from "isomorphic-dompurify";

//import ContextMenu from "../contextMenu";
import MoreIcon from "../assets/more.svg";
import { BlockData } from "../models/BlockData";
import { PageData } from "../models/PageData";

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
    deleteCard? : any;
}

const Card = (props : BaseCardProps) => {
    //console.log(props.page.name);
    //const router = useRouter();
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

    // In the card preview, we only want to show textual content
    //const textContent = props.page.blocks.filter((block:BlockData) => block.type !== "img");

    const deletePage = (id:string) => {
        setIsContextMenuOpen(false);
        props.deleteCard(id); // Self-destroy mode
    };

    const toggleContextMenu = () => {
        console.log("Apertou os três pontos...");
        setIsContextMenuOpen(!isContextMenuOpen);
    };

    const closeContextMenu = () => {
        setIsContextMenuOpen(false);
    };

    return (
        <div className="relative w-5/6 h-auto m-2 mx-auto">
            <a href={`/p/${props.page.id}`}>
                <article className="bg-gray-100 border border-gray-400 rounded-lg p-4 text-base font-regular text-appBase-800">
                    <h1>{props.page.name}</h1>
                    <div className="relative overflow-hidden h-auto ">
                        {/* {textContent.map((block:BlockData, key) => {
                            const HTMLTag = block.type;
                            const html = `${props.page.id} ${DOMPurify.sanitize(block.html)}`;
                            return (
                                <p key={key} dangerouslySetInnerHTML={{ __html: html }} />
                            );
                        })} */}
                    </div>
                </article>
            </a>
            <span role="button" className="absolute bottom-0 right-0 z-10 w-20 h-12 flex justify-center items-center" onClick={() => toggleContextMenu()} > 
                <Image width={20} height={20} src={MoreIcon} alt="Icon" />
            </span>
            {/* {isContextMenuOpen && ( null
        // <ContextMenu
        //   menuItems={[
        //     { id: "edit", label: "Edit", action: () => forwardToPage(pageId) },
        //     { id: "delete", label: "Delete", action: () => deletePage(pageId) },
        //   ]}
        //   closeAction={() => closeContextMenu()}
        // />
        )} */}
    </div>
    );
};

export default Card;