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
    const [error, setError] = useState<boolean>(false)

    const isTitleValid = (title: string): boolean => title.trim().length > 0

    const spanStyles = 'overflow-hidden whitespace-pre-wrap max-w-[100px] wrap-break-word'

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value
        setTitle(newTitle)
        setError(!isTitleValid(newTitle))
    }

    const handleModeChange = () => {
        if(editMode){
            if (isTitleValid(title)){
                onChange(title)
            } else {
                setTitle(value)
                setError(false)
            }
        }
        setEditMode(!editMode)
    }


    return (
        <>
            {editMode
                ? <Input aria-invalid={error} className={className} onChange={handleTitleChange} onBlur={handleModeChange} value={title} autoFocus/>
                : <span className={className ? `${className} ${spanStyles}` : spanStyles}
                             onDoubleClick={handleModeChange}>{value}</span>}
        </>
    )
}
