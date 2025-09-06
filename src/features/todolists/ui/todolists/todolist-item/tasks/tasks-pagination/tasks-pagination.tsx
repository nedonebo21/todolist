import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from '@/shared/ui/shadcn/pagination.tsx'
import { PAGE_SIZE } from '@/shared/constants'

type Props = {
   totalCount: number
   page: number
   setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
   const totalPages = Math.ceil(totalCount / PAGE_SIZE)
   const changePage = (page: number) => {
      setPage(page)
   }

   const getVisiblePages = () => {
      if (totalPages <= 3) {
         return Array.from({ length: totalPages }, (_, i) => i + 1)
      }
      const pages: (number | string)[] = []
      pages.push(1)
      if (page > 3) {
         pages.push('...')
      }
      const startPage = Math.max(2, page - 1)
      const endPage = Math.min(totalPages - 1, page + 1)
      for (let i = startPage; i <= endPage; i++) {
         if (i > 1 && i < totalPages) {
            pages.push(i)
         }
      }
      if (page < totalPages - 2) {
         pages.push('...')
      }
      if (totalPages > 1) {
         pages.push(totalPages)
      }
      return pages
   }
   const visiblePages = getVisiblePages()

   return (
      <div>
         <Pagination className={'flex mb-2.5 justify-center'}>
            <PaginationContent>
               <PaginationItem>
                  <PaginationPrevious
                     href="#"
                     onClick={e => {
                        e.preventDefault()
                        if (page > 1) changePage(page - 1)
                     }}
                     className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
               </PaginationItem>

               {visiblePages.map(pageNum => (
                  <PaginationItem key={pageNum}>
                     <PaginationLink
                        href="#"
                        onClick={e => {
                           e.preventDefault()
                           changePage(pageNum as number)
                        }}
                        isActive={page === pageNum}
                     >
                        {pageNum}
                     </PaginationLink>
                  </PaginationItem>
               ))}

               <PaginationItem>
                  <PaginationNext
                     href="#"
                     onClick={e => {
                        e.preventDefault()
                        if (page < totalPages) changePage(page + 1)
                     }}
                     className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
               </PaginationItem>
            </PaginationContent>
         </Pagination>
         <div className={'flex justify-end mr-4'}>
            <p className={'text-muted-foreground text-sm'}>Total: {totalCount}</p>
         </div>
      </div>
   )
}
