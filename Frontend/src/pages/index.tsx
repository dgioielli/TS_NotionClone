import Head from 'next/head'
import Image from 'next/image'
import { Component, ReactNode, useState } from 'react';
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

interface HomeState{
  cards : PageData[];
}

class Home extends Component<HomeProps, HomeState>{
  properties : HomeProps;

  constructor(props : HomeProps){
    super(props);
    this.properties = props;
    this.state = { cards : props.listCards };
  }

  async addNewPage(){
    try{
      const reply = await apiClient.post("pages", {
        name : "New Page"
      });
      console.log(reply);
    } catch (err) {
      console.log(err);
      alert("Não foi possível criar uma nova página.");
    }
    window.location.reload();
  }

  async deletePage(pageId : string) {
    console.log("Deletar item " + pageId);
    try{
      const reply = await apiClient.delete("pages", {
        data : {
          id : pageId
        }
      });
      console.log(reply);
    } catch (err) {
      console.log(err);
      alert("Não foi possível deletar a página.");
    }
    window.location.reload();
  }

  emptyNotice() : ReactNode{
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

  render() : ReactNode{
    return (
      <div className='text-appBase-100 mb-12'>
        <h1 className="text-center">Pages</h1>
        <div id="pageList">
          {this.state.cards.length === 0 ? this.emptyNotice() : null}
          {this.state.cards.map((page : PageData) => {
            const pageId = page.id;
            return ( <Card key={page.id} page={page} deleteCard={this.deletePage} />  );
          })}
        </div>
        <div className='text-center'>
          <button className='bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-24 rounded' 
                  onClick={() => { this.addNewPage() }} >Create A New Page</button>
        </div>
      </div>
    );
  }
}

export default Home;

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
