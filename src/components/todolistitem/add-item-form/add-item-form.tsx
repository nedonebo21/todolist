import {Button} from "../../button/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type ItemFormProps = {
    onCreateItem: (title: string) => void
}

export const AddItemForm = (props: ItemFormProps) => {
    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState('')

    const handleAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.onCreateItem(title)
            setTitle('')
        } else {
            setError("Title is required")
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAddTask()
        }
    }

    return (
        <div className={"add-tasks"}>
            <input value={title}
                   className={error ? "error" : ""}
                   onChange={handleChange}
                   onKeyDown={handleKeyDown}/>
            <Button title={"+"} onClick={handleAddTask}></Button>
            {error ? <div className={"error-message"}>{error}</div> : ''}
        </div>
    )
}
