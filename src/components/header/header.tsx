import { Button } from "@/shared/ui/shadcn/button.tsx"
import { ThemeToggle } from "@/features/theme-toggle"
import {Progress} from "@/shared/ui/shadcn/progress.tsx";
import {useAppSelector} from "@/shared/lib/hooks";
import {selectStatus} from "@/app/app-slice.ts";

export const Header = () => {
  const status = useAppSelector(selectStatus)
  return (
    <header className={"sticky top-0 z-10 w-full border-b mb-5 bg-transparent backdrop-blur-sm"}>
      <div className={"container flex gap-6 h-16 items-center justify-between mx-auto px-4"}>
        <div className={"text-xl font-bold justify-self-start"}>Todolist by nedonebo21</div>
        <div className={"justify-self-end"}>
          <div className={"flex items-center gap-4"}>
            <Button>Sign in</Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
      {
        status === 'pending' && <Progress/>
      }
    </header>
  )
}
