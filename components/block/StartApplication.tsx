import W from "../custom/W"
import { Button } from "../ui/button"

export default function StartApplication() {
  return (
    <W className="mt-16 py-8">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h4 className="text-2xl font-medium">Ready to serve the nation?</h4>
        <p className="text-xl font-medium text-muted-foreground">
          Agnipath Batch 2025 open. Last date: 31 March 2025.
        </p>
        <Button className="h-12 px-6 text-lg">Start Application</Button>
      </div>
    </W>
  )
}
