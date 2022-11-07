import { useState } from "react";
//import { useRouter } from "next/router";

import DOMPurify from "isomorphic-dompurify";

//import ContextMenu from "../contextMenu";
import MoreIcon from "../assets/more.svg";

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
    pageId : string;
    pageName : string;
    date? : Date;
    content : BlockData[];
    deleteCard? : any;
}

interface BlockData{
    tag : string;
    html : string;
}

const Card = (props : BaseCardProps) => {
    console.log(props.pageName);
    //const router = useRouter();
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

    // In the card preview, we only want to show textual content
    const textContent = props.content.filter((block:BlockData) => block.tag !== "img");
    // console.log(props);
    // return null;
    //const formattedDate = `${MONTHS[props.date.getMonth()]}/ ${props.date.getDate()}/ ${props.date.getFullYear()}`;

  // https://github.com/vercel/next.js/issues/2833#issuecomment-489292656
  //const forwardToPage = (id) => { router.push("/p/[pid]", `/p/${id}`); };

    const deletePage = (id:string) => {
        setIsContextMenuOpen(false);
        props.deleteCard(id); // Self-destroy mode
    };

    const toggleContextMenu = () => {
        setIsContextMenuOpen(!isContextMenuOpen);
    };

    const closeContextMenu = () => {
        setIsContextMenuOpen(false);
    };

    return (
        <div className=""> { /* {styles.cardWrapper} */}
            <a href={`/p/${props.pageId}`}>
                <h1>{props.pageName}</h1>
                <article className="">
                 { /* {styles.card} */}
                    {/* <div className="">{formattedDate}</div> {styles.date} */}
                    <div className=""> {/* {styles.content}*/}
                        {textContent.map((block:BlockData, key) => {
                            const HTMLTag = block.tag;
                            const html = `${props.pageId} ${DOMPurify.sanitize(block.html)}`;
                            return (
                                <p key={key} dangerouslySetInnerHTML={{ __html: html }} />
                            );
                        })}
                    </div>
                </article>
            </a>
            <span
                role="button"
                className="" 
                onClick={() => toggleContextMenu()}
                > {/*{styles.moreButton}*/}
                <img src={MoreIcon} alt="Icon" />
            </span>
            {isContextMenuOpen && ( null
        // <ContextMenu
        //   menuItems={[
        //     { id: "edit", label: "Edit", action: () => forwardToPage(pageId) },
        //     { id: "delete", label: "Delete", action: () => deletePage(pageId) },
        //   ]}
        //   closeAction={() => closeContextMenu()}
        // />
        )}
    </div>
    );
};

export default Card;