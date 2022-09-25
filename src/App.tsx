import styles from './App.module.scss'
import Button from '@mui/material/Button';
import {Note} from "./service/note"
import ListContent from "./components/ListContent"
import {useState} from "react";
import {getAllNotes,deleteNote} from "./service/note";
import FormContent from "./components/FormContent";
import ImportNotesBtn from "./components/ImportNotesBtn";
import ExportNotesBtn from "./components/ExportNotesBtn";

function App() {
  const [notes,setNotes] =   useState(getAllNotes())
    const [currentNote,setCurrentNote] = useState<Note|undefined>(undefined)

  return (
    <div className={styles.container}>

            <div style={{textAlign:"left",paddingBottom:20}}>
                <Button variant="contained" className={styles.actionButton} onClick={()=>setCurrentNote(undefined)} >Add a Note 📒</Button>
                &nbsp; &nbsp;
                <ImportNotesBtn onFinish={()=>setNotes(getAllNotes)}></ImportNotesBtn>
                &nbsp;&nbsp;
                <ExportNotesBtn></ExportNotesBtn>
            </div>

        <div style={{display:'flex'}}>
           <div style={{width:300}}>
               <ListContent notes={notes} currentNote={currentNote}
                onSelect={(note) => setCurrentNote(note)}
                 onDelete={(note) => {
                  deleteNote(note.id)
                 if (note.id === currentNote?.id) setCurrentNote(undefined)
                 setNotes(getAllNotes)
             }}/>
           </div>

            <div style={{flex:1}}>
                <FormContent key={currentNote?.id}
                             note={currentNote}
                             afterSave={(id)=>{
                                 const allNotes = getAllNotes()
                                 const newCurrentNote = allNotes.find((item)=>item.id===id)
                                 setCurrentNote(newCurrentNote)
                                 setNotes(allNotes)
                             }} ></FormContent>
            </div>

        </div>

    </div>
  )
}

export default App
