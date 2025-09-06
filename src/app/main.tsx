import { AddItemForm } from '@/shared/ui/add-item-form/add-item-form.tsx'
import { Todolists } from '@/features/todolists/ui/todolists/todolists.tsx'
import { useAddTodolistMutation } from '@/features/todolists/api/todolists-api.ts'

export const Main = () => {
   const [addTodoList] = useAddTodolistMutation()

   return (
      <div className={'container mx-auto max-w-[1200px] grid gap-y-2.5'}>
         <AddItemForm placeholderValue={'Type your Todolist title'} onCreateItem={addTodoList} />
         <div className={'flex justify-center gap-3 flex-wrap'}>
            <Todolists />
         </div>
      </div>
   )
}
