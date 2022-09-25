import Button from "@mui/material/Button";
import styles from "./index.module.scss";
import {getAllNotes} from "../../service/note"
import {downloadObjectAsXML} from "../../utils/download";

const ExportNotesBtn = () => {
   return  <Button variant="contained" className={styles.actionButton}
   onClick={()=>{
      const notes = getAllNotes()

      downloadObjectAsXML(notes,"my-notes")

   }}
   >Export Notes</Button>
}

export default ExportNotesBtn
