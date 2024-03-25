"use client"
import { TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import removeFromArrayByIndex from "@/utils/removeFromArrayByIndex";
import { Period, ResizableMultiInputEvent } from "../../interface";

export default function({
    label,
    onChange,
    InnerProps,
    helperTexts
}:{
    label:string,
    onChange: (newValue: (string|Period)[])=>void,
    InnerProps?: React.ComponentType<{
        className?:string,
        onChange: (event:ResizableMultiInputEvent)=>void,
        label:string,
        helperText?:any
    }>,
    helperTexts?: string[]
}){
    const initialValue: string|Period = (InnerProps==undefined)?"":{
        startTime:"",
        endTime:""
    };
    InnerProps=InnerProps||TextField;
    const [textValuesList,setTextValuesList] = useState([initialValue]);
    function onAdd(){
        setTextValuesList([...textValuesList,initialValue])
    }
    function onDelete(index:number){
        setTextValuesList(removeFromArrayByIndex(textValuesList,index));
    }
    function onTextChange(event: ResizableMultiInputEvent,index:number){
        textValuesList[index]=event.currentTarget.value as string|Period
        console.log(event.currentTarget.value)
        onChange(textValuesList);
    }
    return (
        <div>
            <div className="flex flex-row justify-between">
                <p>{label}</p>
                <AddIcon onClick={onAdd}></AddIcon>
            </div>
            <div className="flex flex-col w-full gap-2">
                {
                textValuesList.map((textValue,index)=>{
                    return (
                        <div key={index} className="w-full flex flex-row items-center justify-center gap-2">
                            {/* {innerProps.propTypes} */}
                            <InnerProps
                                key={index}
                                className="flex-1 ml-10"
                                onChange={(e)=>{onTextChange(e,index)}}
                                label={`${label} ${index+1}`}
                                helperText={helperTexts==undefined?undefined:helperTexts[index]}
                            />
                            <DeleteIcon onClick={()=>{onDelete(index)}}/>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}