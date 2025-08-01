import { AddItemForm } from '@/shared/ui/add-item-form/add-item-form.tsx'
import { createTodolistTC } from '@/features/todolists/model/todolists-slice.ts'
import { useAppDispatch } from '@/shared/lib/hooks/use-app-dispatch.ts'
import { Todolists } from '@/features/todolists/ui/todolists/todolists.tsx'

export const Main = () => {
   const dispatch = useAppDispatch()
   const addTodoList = (title: string) => {
      const action = createTodolistTC(title)
      dispatch(action)
   }
   return (
      <div className={'container mx-auto max-w-2xl grid gap-y-2.5'}>
         <AddItemForm placeholderValue={'Type your Todolist title'} onCreateItem={addTodoList} />
         <div className={'flex justify-center gap-3 flex-wrap'}>
            <Todolists />
         </div>
      </div>
   )
}
