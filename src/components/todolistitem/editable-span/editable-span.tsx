import {ChangeEvent, useState} from "react";
import {Input} from "@/shared/ui/shadcn/input.tsx";

type Props = {
    value: string
    onChange: (title: string) => void
    className?: string
}


export const EditableSpan = ({value, onChange, className}: Props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(value)

    const spanStyles = 'overflow-hidden whitespace-pre-wrap max-w-[100px] wrap-break-word'

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
        <>
            {editMode
                ? <Input className={className} onChange={handleTitleChange} onBlur={handleModeChange} value={title} autoFocus/>
                : <span className={className ? `${className} ${spanStyles}` : spanStyles}
                             onDoubleClick={handleModeChange}>{value}</span>}
        </>
    )
}
