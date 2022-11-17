import { BlockData } from "../models/BlockData";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Component, FocusEventHandler, ReactNode } from "react";
import getSelection from "../utils/getSelection";
import React from "react";


interface EditableBlockProps{
    block : BlockData;
    onChange : (currentBlock : BlockData) => void;
    onBlur : (currentBlock : BlockData) => void;
    deleteBlock : (currentBlock : BlockData) => void;
}

interface EditableBlockState{
    html : string;
}

class EditableBlock extends Component<EditableBlockProps, EditableBlockState>{
    

    properties : EditableBlockProps;
    //contentEditable : any;
    

    constructor(props : EditableBlockProps){
        super(props);
        this.properties = props;
        //this.contentEditable = React.createRef();
        this.state = { html: props.block.html };
    }

    handleChange = (evt : ContentEditableEvent) => {
        //console.log(evt.target.value);
        this.setState({ html: evt.target.value }, this.updateBlock);
    };

    handleBlur = () => {
        this.properties.onBlur({
            id : this.properties.block.id,
            html : this.state.html,
            pageId : this.properties.block.pageId,
            type : this.properties.block.type,
        });
    }

    updateBlock = () => {
        this.properties.onChange({
            id : this.properties.block.id,
            html : this.state.html,
            pageId : this.properties.block.pageId,
            type : this.properties.block.type,
        });
    }

    onFocus = () => {
        // console.log(this.contentEditable);
        // console.log(typeof this.contentEditable);
        // console.log(this.contentEditable.current);
        // console.log(typeof this.contentEditable.current);
        //console.log(getSelection(this.contentEditable.current));
    }

    handleKeyDown = (event : React.KeyboardEvent) => {
        if (event.key === "Backspace" && !this.state.html){
            this.properties.deleteBlock(this.properties.block);
        }
    }

    render(): ReactNode {
        return (
            <div className="hover:bg-gray-200 p-2">
                <ContentEditable className="p-2" html={this.state.html} onChange={this.handleChange} onBlur={this.handleBlur} onFocus={this.onFocus}
                    onKeyDown={this.handleKeyDown} />
            </div>
        );
    }

}

export default EditableBlock;