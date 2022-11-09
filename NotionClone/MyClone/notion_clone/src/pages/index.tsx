import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import Notice from '../components/NoticeCard';
import Card from '../components/PageCard';
import { BlockData } from '../models/BlockData';
import { PageData } from '../models/PageData';

const mockPage = { id: "10", name: "Teste", blocks : [] }
var initialCards : PageData[] = [ ];
//const initialCards : PageData[] = [ mockPage, mockPage ];

export default function Home() {
  const [cards, setCards] = useState(initialCards.map((data : PageData) => data));

  const addNewPage = () => {
    initialCards.push(mockPage);
    console.log(initialCards.length);
    setCards(initialCards);
  }

  return (
    <div className='text-appBase-100 mb-12'>
      <h1 className="text-center">Pages</h1>
      <div id="pageList">
        {cards.length === 0 ? emptyNotice() : null}
        {cards.map((page : PageData) => {
          const pageId = page.id;
          const blocks = page.blocks;
          return ( <Card key={"key"} page={page} />  );
        })}
      </div>
      <div className='text-center'>
        <button className='bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-24 rounded' onClick={() => { addNewPage() }} >Create A New Page</button>
      </div>
    </div>
  )
}
// w-98% p-4 mx-4 h-10 bg-appBase-500 rounded-lg content-center
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
