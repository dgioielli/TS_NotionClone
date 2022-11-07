
interface PProps{
    pid : string;
}

const Page = (props : PProps) => {
    return <h1>{props.pid}</h1>;
};

export default Page;

export const getServerSideProps = async (context:any) => {
    //console.log(context);
    return { props : { pid: context.query.pageId }};
    // resetServerContext(); // needed for drag and drop functionality
    // const pageId = context.query.pid;
    // const req = context.req;
    // try {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API}/pages/${pageId}`,
    //     {
    //       method: "GET",
    //       credentials: "include",
    //       // Forward the authentication cookie to the backend
    //       headers: {
    //         "Content-Type": "application/json",
    //         Cookie: req ? req.headers.cookie : undefined,
    //       },
    //     }
    //   );
    //   const data = await response.json();
    //   return {
    //     props: { blocks: data.page.blocks, pid: pageId, err: false },
    //   };
    // } catch (err) {
    //   console.log(err);
    //   return { props: { blocks: null, pid: null, err: true } };
    // }
  };