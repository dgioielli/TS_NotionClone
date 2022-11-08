import { useState, useEffect, Component, ReactNode } from "react";
import { useRouter } from "next/router";

import Notice from "./NoticeCard";
import { BlockData } from "../models/BlockData";
import EditableBlock from "./EditableBlock";

const mockData = [
    { id : "5f54d75b114c6d176d7e9765", html : "Heading", type : "", pageId : "10" },
    { id : "5f54d75b114c6d176d7e9766", html : "I am a <strong>paragraph</strong>", type : "", pageId : "10" },
    { id : "5f54d75b114c6d176d7e9767", html : "I am a <strong>paragraph</strong>", type : "", pageId : "10" },
]

interface DataProps{
    id : string;
    //blockList : BlockData[];
}

interface DataState{
  blocks : BlockData[];
}

class EditablePage extends Component<DataProps, DataState>{

  properties : DataProps;

  constructor(props : DataProps){
    super(props);
    this.properties = props;
    this.state = { blocks : mockData };
  }

  getEditableBlock(block:BlockData) {
    return (<EditableBlock block={block} />);
  }

  render(): ReactNode {
    return (
      <div>
        <h1>{this.properties.id}</h1>
        <p>Página editável!!!</p>
        {this.state.blocks.map((block : BlockData) => this.getEditableBlock(block))}
      </div>
    );
  }

}

// const EditablePage = (props: DataProps) => {
//   const router = useRouter();
//   const [blocks, setBlocks] = useState(mockData);

//   const isNewPublicPage = router.query.public === "true";
//   return (
//     <div>
//       <h1>{props.id}</h1>
//       <p>Página editável!!!</p>
//       {blocks.map((block : BlockData) => getEditableBlock(block))}
//     </div>
//   );
// };

export default EditablePage;

// function getEditableBlock(block : BlockData){
//   return (<EditableBlock block={block} />);
// }
