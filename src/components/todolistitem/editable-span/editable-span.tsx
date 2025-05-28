import {ChangeEvent, useState} from "react";

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
            ? <input onChange={handleTitleChange} onBlur={handleModeChange} value={title} autoFocus/>
            : <span onDoubleClick={handleModeChange}>{value}</span>
    )
}
