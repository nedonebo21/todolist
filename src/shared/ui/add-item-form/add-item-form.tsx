import {Button} from "@/shared/ui/shadcn/button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Input} from "@/shared/ui/shadcn/input.tsx";
import {BookmarkPlus, InfoIcon} from 'lucide-react'
import {cn} from "@/shared/lib/utils.ts";


type ItemFormProps = {
    onCreateItem: (title: string) => void
    placeholderValue?: string
    className?: string
}

export const AddItemForm = (props: ItemFormProps) => {
    const {onCreateItem, placeholderValue, className} = props

    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState('')

    const handleAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            onCreateItem(title)
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
        <div className={`flex gap-1 flex-col ${className}`}>
            <div className={"flex gap-1.5"}>
                <Input
                    value={title}
                    className={cn(error && 'text-destructive')}
                    aria-invalid={!!error}
                    placeholder={placeholderValue ?? 'Enter your title'}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}/>
                <Button size={'icon'} onClick={handleAddTask}>
                    <BookmarkPlus/>
                </Button>
            </div>
            {!!error && (
                <div className={'flex text-destructive text-xs  gap-1'}>
                    <span><InfoIcon className={'mt-[3px]'} size={12}/></span>
                    <span>{error}</span>
                </div>
            )
            }
        </div>
    )
}
