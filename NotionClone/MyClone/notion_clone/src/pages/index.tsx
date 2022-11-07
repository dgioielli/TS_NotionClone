import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import Notice from '../components/NoticeCard';
import Card from '../components/PageCard';

interface PageBase{
  id : string;
  name : string;
  blocks : BlockData[];
}

interface BlockData{
  tag : string;
  html : string;
}

export default function Home() {
  const mockPage = { id: "10", name: "Teste", blocks : [] }
  const initialCards = [ mockPage, mockPage ];
  const [cards, setCards] = useState(initialCards.map((data) => data));

  return (
    <div>
      <h1 className="pageHeading">Pages</h1>
      <div id="pageList">
        {cards.length === 0 ? emptyNotice() : null}
        {cards.map((page : PageBase) => {
          //const updatedAtDate = new Date(Date.parse(page.updatedAt));
          const pageId = page.id;
          const blocks = page.blocks;
          return (
            <Card
              key={"key"}
              pageId={pageId}
              pageName={page.name}
              content={blocks}
            /> 
          );
        })}
      </div>
      <button >Create A New Page</button>
    </div>
  )
}

//{/* date={updatedAtDate}*/ } {/*deleteCard={(pageId) => deleteCard(pageId)}*/ }

function emptyNotice(){
  const title = "Let's go!";
  const row1 = "Seems like you haven't created any pages so far.";
  return (
    <Notice dismissible={true} >
      <h3>{title}</h3>
      <p>{row1}</p>
      <p>How about starting now?</p>
    </Notice>
  );
}
