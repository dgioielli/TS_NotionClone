import { useState, useEffect, Component, ReactNode } from "react";
import { useRouter } from "next/router";

import Notice from "./NoticeCard";
import { BlockData } from "../models/BlockData";
import EditableBlock from "./EditableBlock";
import { PageData } from "../models/PageData";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { apiClient } from "../lib/axios";

interface DataProps{
    page : PageData;
    blockList : BlockData[];
}

interface DataState{
  namePage : string;
  blocks : BlockData[];
}

class EditablePage extends Component<DataProps, DataState>{

  properties : DataProps;

  constructor(props : DataProps){
    super(props);
    this.properties = props;
    this.state = { blocks : props.blockList, namePage : props.page.name };
  }

  getEditableBlock(block:BlockData) {
    return (<EditableBlock block={block} />);
  }

  handleChange = (evt : ContentEditableEvent) => {
    this.setState({ namePage : evt.target.value });
  };

  handleBlur = async () => {
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
        <ContentEditable html={this.state.namePage} onChange={this.handleChange} onBlur={this.handleBlur} tagName={"h1"} />
        {this.state.blocks.map((block : BlockData) => this.getEditableBlock(block))}
      </div>
    );
  }

}

export default EditablePage;
