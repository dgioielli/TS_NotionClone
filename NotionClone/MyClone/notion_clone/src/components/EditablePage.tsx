import { useState, useEffect, Component, ReactNode } from "react";
import { useRouter } from "next/router";

import { BlockData } from "../models/BlockData";
import EditableBlock from "./EditableBlock";
import { PageData } from "../models/PageData";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { apiClient } from "../lib/axios";
import tempId, { baseTempId } from "../utils/tempId";
import { stat } from "fs";

interface DataProps{
    page : PageData;
    blockList : BlockData[];
}

interface DataState{
  namePage : string;
  blocks : BlockData[];
  deletedBlocks : BlockData[];
}

class EditablePage extends Component<DataProps, DataState>{

  properties : DataProps;

  constructor(props : DataProps){
    super(props);
    this.properties = props;
    const delBlocks : BlockData[] = [];
    this.state = { 
      blocks : this.addLastBlockEmpty(props.blockList), 
      namePage : props.page.name, 
      deletedBlocks : delBlocks,
    };
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
    //this.saveBlock(currentBlock);
    updatedBlocks[index] = currentBlock;
    this.setState({ blocks : updatedBlocks}, this.blockListUpdateCallBack);
  }

  saveBlock = (block : BlockData) => {
    if (block.id.includes(baseTempId)){
      this.addDataBlock(block);
    } else {
      this.updateDataBlock(block);
    }
  }

  addDataBlock = async (block : BlockData) => {
    try{
      const reply = await apiClient.post(`blocks`, {
        html : block.html,
        pageId : block.pageId,
        type : block.type,
      });
      console.log(reply);
      block.id = reply.data.id;
    } catch (err) {
      console.log(err);
      alert("Não foi possível editar a página.");
    }
  }

  updateDataBlock = async (block:BlockData) => {
    try{
      const reply = await apiClient.put(`block/${block.id}`, {
        html : block.html,
        pageId : block.pageId,
        type : block.type,
      });
      console.log(reply);
    } catch (err) {
      console.log(err);
      alert("Não foi possível editar a página.");
    }
  }

  deleteBlock = (currentBlock : BlockData) => {
    if (this.state.blocks.length > 1) {
      const index = this.state.blocks.map((b) => b.id).indexOf(currentBlock.id);
      const deletedBlock = this.state.blocks[index];
      const updatedBlocks = [...this.state.blocks];
      updatedBlocks.splice(index, 1);
      this.deleteDataBlock(deletedBlock);
      this.setState({ blocks : updatedBlocks}, this.blockListUpdateCallBack);
    }
  }

  deleteDataBlock =async (block:BlockData) => {
    try{
      const reply = await apiClient.delete(`blocks`, {
        data : {
          id : block.id,
        }
      });
      console.log(reply);
    } catch (err) {
      console.log(err);
      alert("Não foi possível editar a página.");
    }
  }

  getEditableBlock(block:BlockData) {
    return (<EditableBlock key={block.id} block={block} onChange={this.updateBlock} deleteBlock={this.deleteBlock} onBlur={this.saveBlock} />);
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
          <ContentEditable key={0} html={this.state.namePage} onChange={this.handleChangeNamePage} onBlur={this.handleBlurNamePage} tagName={"h1"} />
        </div>
        {this.state.blocks.map((block : BlockData) => this.getEditableBlock(block))}
      </div>
    );
  }

}

export default EditablePage;
