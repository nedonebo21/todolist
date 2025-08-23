import { EditableSpan } from '@/shared/ui/editable-span/editable-span.tsx'
import { Button } from '@/shared/ui/shadcn/button.tsx'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import { changeTodolistTitleTC } from '@/features/todolists/model/todolists-slice.ts'
import { useAppDispatch } from '@/shared/lib/hooks'
import { DomainTodolist } from '@/features/todolists/api/todolists-api.types.ts'
import { useRemoveTodolistMutation } from '@/features/todolists/api/todolists-api.ts'

type Props = {
   todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
   const { id, title, entityStatus } = todolist
   const dispatch = useAppDispatch()

   const [removeTodolist] = useRemoveTodolistMutation()
   const deleteTodolist = () => {
      toast.success(`Todolist ${title} deleted`)
      removeTodolist(id)
   }

   const changeTodoTitle = (title: string) => {
      dispatch(changeTodolistTitleTC({ id, title }))
   }
   return (
      <div className={'flex justify-between items-center gap-2'}>
         <EditableSpan
            disabled={entityStatus === 'pending'}
            value={title}
            onChange={changeTodoTitle}
         />
         <Button
            disabled={entityStatus === 'pending'}
            variant={'ghost'}
            size={'icon'}
            onClick={deleteTodolist}
         >
            <TrashIcon className={'text-destructive'} />
         </Button>
      </div>
   )
}
