import { useState, useEffect, Component, ReactNode } from "react";
import { useRouter } from "next/router";

import { BlockData } from "../models/BlockData";
import EditableBlock from "./EditableBlock";
import { PageData } from "../models/PageData";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { apiClient } from "../lib/axios";
import tempId from "../utils/tempId";

interface DataProps{
    page : PageData;
    blockList : BlockData[];
}

interface DataState{
  namePage : string;
  blocks : BlockData[];
  teste : string;
}

class EditablePage extends Component<DataProps, DataState>{

  properties : DataProps;

  constructor(props : DataProps){
    super(props);
    this.properties = props;
    this.state = { blocks : this.addLastBlockEmpty(props.blockList), namePage : props.page.name, teste: "teste" };
  }

  checkLastBlockEmpty = (list : BlockData[]) : boolean => {
    const contentList = list.map((b) => b.html);
    if (contentList[contentList.length - 1] === ""){
      return true;
    }
    return false;
  }

  addLastBlockEmpty = (blockList : BlockData[]) : BlockData[] => {
    if (this.checkLastBlockEmpty(blockList)){
      console.log("Não precisa acrescentar!!!");
      return blockList;
    }
    const index = blockList.length - 1;
    const updatedBlocks = [...blockList];
    const newBlock : BlockData = { id: tempId(), type: "p", html: "", pageId : this.properties.page.id };
    updatedBlocks.splice(index + 1, 0, newBlock);
    return updatedBlocks;
  }

  blockListUpdateCallBack = () => {
    if (this.checkLastBlockEmpty(this.state.blocks) === false){
      this.setState({ blocks : this.addLastBlockEmpty(this.state.blocks)});
      console.log("new block");
    }
  }
  
  updateBlock = (currentBlock : BlockData) => {
    const index = this.state.blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...this.state.blocks];
    updatedBlocks[index] = currentBlock;
    this.setState({ blocks : updatedBlocks}, this.blockListUpdateCallBack);
  }

  getEditableBlock(block:BlockData) {
    return (<EditableBlock block={block} onChange={this.updateBlock} />);
  }

  handleChangeNamePage = (evt : ContentEditableEvent) => {
    this.setState({ namePage : evt.target.value });
  };

  handleBlurNamePage = async () => {
    console.log(this.properties.page.id);
    console.log(`page/${this.properties.page.id}`);
    try{
      const reply = await apiClient.put(`page/${this.properties.page.id}`, {
        name : this.state.namePage
      });
      console.log(reply);
    } catch (err) {
      console.log(err);
      alert("Não foi possível editar a página.");
    }
  }

  render(): ReactNode {
    return (
      <div>
        <div className="hover:bg-gray-200 p-2">
          <ContentEditable html={this.state.namePage} onChange={this.handleChangeNamePage} onBlur={this.handleBlurNamePage} tagName={"h1"} />
        </div>
        {this.state.blocks.map((block : BlockData) => this.getEditableBlock(block))}
      </div>
    );
  }

}

export default EditablePage;
