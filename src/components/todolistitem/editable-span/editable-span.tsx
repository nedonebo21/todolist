import {ChangeEvent, useState} from "react";
import {CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";

type Props = {
    value: string
    onChange: (title: string) => void
}


export const EditableSpan = ({value,onChange}:Props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(value)

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleModeChange = () => {
        setEditMode(!editMode)
        if(editMode){
            onChange(title)
        }
    }


    return (
        editMode
            ? <Input onChange={handleTitleChange} onBlur={handleModeChange} value={title} autoFocus/>
            : <CardTitle className={'overflow-hidden whitespace-pre-wrap max-w-[100px] wrap-break-word'} onDoubleClick={handleModeChange}>{value}</CardTitle>
    )
}
