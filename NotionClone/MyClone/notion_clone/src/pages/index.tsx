import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import Notice from '../components/NoticeCard';
import Card from '../components/PageCard';
import { BlockData } from '../models/BlockData';
import { PageData } from '../models/PageData';
import { api, apiClient } from "../lib/axios";
import { useRouter } from 'next/router';

const mockPage = { id: "10", name: "Teste", blocks : [] }
// var initialCards : PageData[] = [ ];
//const initialCards : PageData[] = [ mockPage, mockPage ];

interface HomeProps{
  listCards : PageData[];
}

export default function Home(props:HomeProps) {
  //console.log(props);
  const router = useRouter();
  const initialCards : PageData[] = props.listCards;
  const [cards, setCards] = useState(initialCards.map((data : PageData) => data));

  const addNewPage = async () => {
    try{
      const reply = await apiClient.post("pages", {
        name : "New Page"
      });
      console.log(reply);
    } catch (err) {
      console.log(err);
      alert("O bolão foi criado com sucesso! O código foi copiado para a área de transferência.");
    }
    window.location.reload();
    //router.push("");
  }

  return (
    <div className='text-appBase-100 mb-12'>
      <h1 className="text-center">Pages</h1>
      <div id="pageList">
        {cards.length === 0 ? emptyNotice() : null}
        {cards.map((page : PageData) => {
          const pageId = page.id;
          return ( <Card key={page.id} page={page} />  );
        })}
      </div>
      <div className='text-center'>
        <button className='bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-24 rounded' onClick={() => { addNewPage() }} >Create A New Page</button>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const pages = await api.get("pages");
  const pagesList = pages.data.pages;
  const listCards : PageData[] = [];
  for(let i = 0; i < pagesList.length; i++){
    const pg : PageData = pagesList[i];
    listCards.push({ "id" : pg.id, "name" : pg.name });
  } 
  return { props : { listCards } };
}

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
