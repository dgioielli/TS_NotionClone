import { Component, ReactNode } from "react";
import EditablePage from "../../components/EditablePage";
import { api, apiClient } from "../../lib/axios";
import { BlockData } from "../../models/BlockData";
import { PageData } from "../../models/PageData";

interface PageProps{
    page : PageData;
    blockList : BlockData[];
}
class Page extends Component<PageProps>{

    properties : PageProps;

    constructor(props: PageProps){
        super(props);
        this.properties = props;
    }

    render(): ReactNode {
        return (
            <div className="w-5/6 h-auto m-2 mx-auto bg-gray-100 border border-gray-400 rounded-lg p-2">
                {/* <h1>{this.properties.page.name}</h1> */}
                <EditablePage page={this.properties.page} blockList={this.properties.blockList} />
            </div>
        );
    }
}

export default Page;

export const getServerSideProps = async (context:any) => {
    //console.log(context);
    const mockData : BlockData[] = [
        { id : "5f54d75b114c6d176d7e9765", html : "Heading", type : "", pageId : "10" },
        { id : "5f54d75b114c6d176d7e9766", html : "I am a <strong>paragraph</strong>", type : "", pageId : "10" },
        { id : "5f54d75b114c6d176d7e9767", html : "I am a <strong>paragraph</strong>", type : "", pageId : "10" },
    ];
    console.log(`page/${context.query.pageId}`);
    const getPage = await api.get(`page/${context.query.pageId}`);
    const getPageData : PageData = getPage.data.page;
    //const mockPage : PageData = { id : context.query.pageId, name : "Teste" };
    return { 
        props : { 
            //page: mockPage,
            page : getPageData,
            blockList : mockData,
        }
    };
};