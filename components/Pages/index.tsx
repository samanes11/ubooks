import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css';
import './css.module.css';
import WindowFloat from '../Libs/WindowFloat';

export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "خوش آمدید"


  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />

      {state.form == "bookspecs"?<WindowFloat 
      title={"مشخصات کتاب"} onclose={()=>{
        state.form = null
        refresh()
      }}>


        
        <f-c>
          <f-15>نام کتاب: {state.book.title}</f-15>

        </f-c>

        <f-c>
          <f-15>نام نویسنده: {state.book.author}</f-15>

        </f-c>

        <f-c>
          <f-15>نام کشور: {state.book.country}</f-15>

        </f-c>

        <f-c>
          <f-15>سال انتشار: {state.book.year }</f-15>

        </f-c>

        <f-c>
          <f-15>تعداد صفحه: {(state.book.pages as number).toLocaleString("fa-ir")}</f-15>

        </f-c>

        <f-c>
          <f-15>زبان: {state.book.language}</f-15>
          
        </f-c>

        <f-c>
          <f-15>قیمت: {(state.book.price as number).toLocaleString("fa-ir")}</f-15>

        </f-c>

      </WindowFloat>:null}
      <Window title={name} 
      style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre> */}

        <w-cse style={{}}>

           {props.books.map(book=>{
             return <img
             className={global.styles.hover} 
             src={book.imageLink} 
             style={{width:150, height:200, objectFit:"fill", flex:1, minWidth:150}}
             onClick={()=>{
               state.form = "bookspecs"
               state.book = book
               refresh()
             }}/>
           })}
        </w-cse>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("books").find({}).toArray()

  for(let book of books)
  {
    book.imageLink = "https://irmapserver.ir/research/ex/books/"+ book.imageLink
  }

  console.log(books)
  return {
    props: {
      data: global.QSON.stringify({
        session,
        books
        // nlangs,
      })
    },
  }
}