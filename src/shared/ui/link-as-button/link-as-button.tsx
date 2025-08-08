import { Button } from '@/shared/ui/shadcn/button.tsx'
import { NavLink } from 'react-router'

type LinkAsButtonPropsType = {
   className: string
   size: 'lg' | 'icon' | 'sm' | 'default'
}

export const LinkAsButton = (props: LinkAsButtonPropsType) => {
   return (
      <Button {...props} asChild>
         <NavLink to={'/'}>Back</NavLink>
      </Button>
   )
}
