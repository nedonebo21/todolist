import { EditableSpan } from '@/shared/ui/editable-span/editable-span.tsx'
import { Button } from '@/shared/ui/shadcn/button.tsx'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import {
   todolistsApi,
   useRemoveTodolistMutation,
   useUpdateTodolistTitleMutation,
} from '@/features/todolists/api/todolists-api.ts'
import { RequestStatus } from '@/shared/types/types.ts'
import { useAppDispatch } from '@/shared/lib/hooks'
import { DomainTodolist } from '@/features/todolists/lib/types'

type Props = {
   todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
   const { id, title, entityStatus } = todolist

   const dispatch = useAppDispatch()

   const [removeTodolist] = useRemoveTodolistMutation()
   const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

   const changeTodolistStatus = (entityStatus: RequestStatus) => {
      dispatch(
         todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
            const todolist = state.find(tl => tl.id === id)
            if (todolist) {
               todolist.entityStatus = entityStatus
            }
         })
      )
   }

   const deleteTodolist = () => {
      toast.success(`Todolist ${title} deleted`)
      changeTodolistStatus('pending')
      removeTodolist(id)
         .unwrap()
         .catch(() => {
            changeTodolistStatus('idle')
         })
   }

   const handleTodolistUpdate = (title: string) => {
      updateTodolistTitle({ id, title })
   }
   return (
      <div className={'flex justify-between items-center gap-2'}>
         <EditableSpan
            disabled={entityStatus === 'pending'}
            value={title}
            onChange={handleTodolistUpdate}
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
