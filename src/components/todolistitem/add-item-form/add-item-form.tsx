import {Button} from "@/components/ui/button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {BookmarkPlus} from 'lucide-react'


type ItemFormProps = {
    onCreateItem: (title: string) => void
    placeholderValue?: string
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
        <>
            <div className={"flex gap-1"}>
                <Input
                    size={2}
                    value={title}
                    className={'w-[288px]'}
                    placeholder={props.placeholderValue ?? 'Enter your title'}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}/>
                <Button size={'icon'} onClick={handleAddTask}>
                    <BookmarkPlus/>
                </Button>
            </div>
            {error ? <div className={"text-red-600"}>{error}</div> : ''}
        </>
    )
}
