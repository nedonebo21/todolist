import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/shadcn/card.tsx'
import { Skeleton } from '@/shared/ui/shadcn/skeleton.tsx'
import { ScrollArea } from '@/shared/ui/shadcn/scroll-area.tsx'
import { TaskItemSkeleton } from '@/features/todolists/ui/todolists/todolist-item/tasks/task-item/task-item-skeleton.tsx'

export const TodolistItemSkeleton = () => (
   <Card className="min-w-xs h-[560px]">
      <CardHeader className={'container'}>
         <div className={'flex items-center justify-between'}>
            <Skeleton className={'h-6 w-32'} />
            <Skeleton className={'h-8 w-8 rounded-full'} />
         </div>
      </CardHeader>
      <CardContent className={'flex-1'}>
         <ScrollArea>
            <div className={'flex gap-2 mb-3'}>
               <Skeleton className={'h-9 flex-1'} />
               <Skeleton className={'h-9 w-16'} />
            </div>
            {Array(4)
               .fill(null)
               .map((_, id) => (
                  <TaskItemSkeleton key={id} />
               ))}
         </ScrollArea>
      </CardContent>
      <CardFooter className={'w-full'}>
         <div className={'flex flex-col gap-2 w-full'}>
            <div className={'flex gap-2'}>
               {Array(3)
                  .fill(null)
                  .map((_, id) => (
                     <Skeleton key={id} className={'h-8 flex-1'} />
                  ))}
            </div>
            <Skeleton className={'h-9 w-full'} />
         </div>
      </CardFooter>
   </Card>
)
