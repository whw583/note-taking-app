import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListItemButton from "@mui/material/ListItemButton";
import {Note} from "../../service/note";
import styles from "./index.module.scss"
import dayjs from "dayjs"

type ListContentProps = {
    notes:Note[]
    currentNote:Note|undefined
    onSelect?:(note:Note)=>void
    onDelete?:(note:Note)=>void
}

const ListContent = ({notes,currentNote,onSelect,onDelete}:ListContentProps) => {
   return <List>
           {notes.map((note)=>{
               const selected = currentNote?.id ===note.id
               return  <ListItem key={note.id} disablePadding >
                   <div className={selected?styles.selected:""}>
                       <ListItemButton >
                           <div  onClick={()=>{
                               if(onSelect){
                                   onSelect(note)
                               }
                           }}>
                               <h2 className={styles.truncate} style={{fontSize:14,fontWeight:"bold"}} >
                                   {note.title}
                               </h2>
                               <div>last updated: {dayjs(note.updated).format("MM-DD HH:mm:ss")}</div>
                           </div>
                       </ListItemButton>
                   </div>

                   <div style={{textAlign:"right"}} onClick={(event)=>{
                       event.stopPropagation();
                       if(onDelete) onDelete(note)
                   }}>
                       <DeleteForeverIcon></DeleteForeverIcon>
                   </div>
               </ListItem>
           })}
       </List>
}

export default ListContent
