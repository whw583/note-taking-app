import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from '@mui/material/Input';
import {FormGroup, TextareaAutosize} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import styles from "./index.module.scss"
import {saveNote,Note} from "../../service/note"

interface IFormInput {
    title: string;
    body: string;
}

type FormContentProps = {
    afterSave?: (id:string)=>void;// callback function after saved
    note?:Note
};

const FormContent = ({afterSave,note}:FormContentProps) => {
    const { control, handleSubmit,formState: { errors, }, } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => {
    const id =    saveNote({...note,...data})
        if(afterSave){
            afterSave(id)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <FormControl style={{paddingBottom:10}}>
                    <Controller
                        rules={{ validate:(value)=>{
                           if(!value) return "title is required"
                                return  true;
                            } }}
                        name="title"
                        control={control}
                        defaultValue={note?.title}
                        render={({ field }) => <Input placeholder="enter note title here" {...field} />}
                    />
                    {errors.title&& <FormHelperText  error={true}>{errors.title?.message}</FormHelperText>}
                </FormControl>


                <FormControl style={{paddingBottom:10}}>
                    <Controller
                        name="body"
                        control={control}
                        defaultValue={note?.body}
                        rules={{ validate:(value)=>{
                                if(!value) return "body is required"
                                return  true;
                            } }}
                        render={({ field }) => <TextareaAutosize
                            placeholder="enter note body here"
                            minRows={20} maxRows={20} {...field} />}
                    />
                    {errors.body&& <FormHelperText  error={true}>{errors.body?.message}</FormHelperText>}
                </FormControl>

                <FormControl>
                    <Button type="submit" variant="contained"
                            className={styles.actionButton}
                    >{note?"save":"create"}</Button>
                </FormControl>
            </FormGroup>

        </form>
    );
};

export default FormContent
