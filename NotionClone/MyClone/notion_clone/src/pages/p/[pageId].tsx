import EditablePage from "../../components/EditablePage";

interface PProps{
    pid : string;
}

const Page = (props : PProps) => {
    return (
        <div>
            <h1>{props.pid}</h1>
            <EditablePage id={props.pid} />
        </div>
    )
};

export default Page;

export const getServerSideProps = async (context:any) => {
    //console.log(context);
    return { props : { pid: context.query.pageId }};
};