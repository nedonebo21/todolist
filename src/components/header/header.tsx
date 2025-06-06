import {Button} from '@/components/ui/button.tsx'
import {ReactNode} from 'react'
import {ModeToggle} from '@/components/theme-change/mode-toggle.tsx'

type Props = {
    children: ReactNode
}

export const Header = (props: Props) => {
    return (
        <header className={'sticky top-0 z-10 w-full border-b mb-5 bg-transparent backdrop-blur-sm'}>
            <div className={'container grid grid-cols-3 gap-6 h-16 items-center justify-between mx-auto px-4'}>
                <div className={'text-xl font-bold justify-self-start'}>
                    Todolist by nedonebo21
                </div>
                <div className={'justify-self-center'}>
                    {props.children}
                </div>
                <div className={'justify-self-end'}>
                    <div className={'flex items-center gap-4'}>
                        <Button>Sign in</Button>
                        <ModeToggle/>
                    </div>
                </div>
            </div>
        </header>
    )
}