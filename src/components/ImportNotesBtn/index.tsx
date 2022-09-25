import Button from "@mui/material/Button";
import styles from "./index.module.scss";
import {XMLParser} from "fast-xml-parser";
import {useRef, useState} from "react";
import {saveNote,ToSaveNote} from "../../service/note";
import { parseUploadFile} from "./utils"

interface ImportNotesBtnProps {
    onFinish?:()=>void
}

const ImportNotesBtn = ({onFinish}:ImportNotesBtnProps) => {
    const [uniqueId,setUniqueId] = useState(Math.random())
    const inputRef = useRef<HTMLInputElement|null>(null)

    return  <>
       <input hidden key={uniqueId}
              ref={(ref)=>inputRef.current=ref}
              accept=".xml"
              type="file"
              onChange={async (event)=>{
                  try {
                      const files = event?.target?.files||[]
                      const objectStr = await parseUploadFile(files[0])
                      const parser = new  XMLParser({  numberParseOptions:{
                              hex:false,
                              leadingZeros: false,
                              skipLike: /[\d\D]*/ // skip all
                          }})

                      const importNotes =  (parser.parse(objectStr)?.content || []) as ToSaveNote[]

                      importNotes.forEach((item)=>{
                          saveNote(item)
                      })

                      if(onFinish) onFinish()

                  }
                  catch (error){
                      console.log(error);
                  }

            setUniqueId(Math.random())

       }}/>
       <Button variant="contained"
               className={styles.actionButton} onClick={()=>inputRef.current?.click()}>
           Import Notes
       </Button>
   </>
}

export default ImportNotesBtn
