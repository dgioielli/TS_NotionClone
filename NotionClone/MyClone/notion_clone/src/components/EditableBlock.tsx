import { BlockData } from "../models/BlockData";
import ContentEditable from "react-contenteditable";
import { Component, ReactNode } from "react";


interface EditableBlockProps{
    block : BlockData;
}

interface EditableBlockState{
    html : string;
}

class EditableBlock extends Component<EditableBlockProps, EditableBlockState>{

    properties : EditableBlockProps;

    constructor(props : EditableBlockProps){
        super(props);
        this.properties = props;
        this.state = { html: props.block.html };
    }

    handleChange(evt : any){
        //console.log(evt.target.value);
        this.setState({ html: evt.target.value });
    };

    render(): ReactNode {
        return (
            <div className="hover:bg-gray-200 p-2">
                {/* <h1>Bloco editável!!!</h1> */}
                <ContentEditable html={this.state.html} onChange={this.handleChange} />
            </div>
        );
    }

}

export default EditableBlock;