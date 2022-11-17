import { BlockData } from "../models/BlockData";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Component, ReactNode } from "react";
import React from "react";
import { getCaretIndex } from "../utils/getCaretIndex";


interface EditableBlockProps{
    block : BlockData;
    onChange : (currentBlock : BlockData) => void;
    onBlur : (currentBlock : BlockData) => void;
    deleteBlock : (currentBlock : BlockData) => void;
    moveFocus : (block : BlockData, isNext : boolean) => void;
}

interface EditableBlockState{
    html : string;
    edited : boolean;
}

class EditableBlock extends Component<EditableBlockProps, EditableBlockState>{
    

    properties : EditableBlockProps;
    //contentEditable : any;
    

    constructor(props : EditableBlockProps){
        super(props);
        this.properties = props;
        //this.contentEditable = React.createRef();
        this.state = { html: props.block.html, edited : false };
    }

    handleChange = (evt : ContentEditableEvent) => {
        if (this.state.html !== evt.target.value){
            this.setState({ html: evt.target.value }, this.updateBlock);
            this.setState({ edited: true });
        }
    };

    handleBlur = () => {
        if (this.state.edited){
            this.properties.onBlur({
                id : this.properties.block.id,
                html : this.state.html,
                pageId : this.properties.block.pageId,
                type : this.properties.block.type,
            });
        }
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
        // console.log(getCaretIndex(event.currentTarget));
        // console.log(event.key);
        if (event.key === "Backspace" && !this.state.html){
            this.properties.deleteBlock(this.properties.block);
        } else if (event.key === "ArrowUp"){
            this.properties.moveFocus(this.properties.block, false);
        } else if (event.key === "ArrowDown"){
            this.properties.moveFocus(this.properties.block, true);
        }
    }

    render(): ReactNode {
        return (
            <div className="hover:bg-gray-200 p-2">
                <ContentEditable className="p-2" html={this.state.html} onChange={this.handleChange} onBlur={this.handleBlur} onFocus={this.onFocus}
                    onKeyDown={this.handleKeyDown} id={`Bloco-${this.properties.block.id}`} />
            </div>
        );
    }

}

export default EditableBlock;