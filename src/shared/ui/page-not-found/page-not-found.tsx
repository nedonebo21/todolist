import { LinkAsButton } from '@/shared/ui/link-as-button/link-as-button.tsx'

export const PageNotFound = () => {
   return (
      <div>
         <h1 className={'text-center font-bold text-[250px] m-0'}>404</h1>
         <h2 className={'text-center font-bold text-[50px] m-0'}>Page Not Found</h2>
         <div className={'flex justify-center mt-2.5'}>
            <LinkAsButton size={'lg'} className={'w-[260px]'} />
         </div>
      </div>
   )
}
