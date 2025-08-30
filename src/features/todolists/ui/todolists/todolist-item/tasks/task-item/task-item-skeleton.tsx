import { Skeleton } from '@/shared/ui/shadcn/skeleton.tsx'

export const TaskItemSkeleton = () => (
   <div className="flex justify-between gap-1.5 items-center py-2">
      <div className={'flex gap-3 flex-1  items-center'}>
         <Skeleton className={'h-4 w-4 rounded'} />
         <Skeleton className={'h-5 flex-1'} />
      </div>
      <Skeleton className={'h-8 w-8 rounded'} />
   </div>
)
