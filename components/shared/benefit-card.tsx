import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface BenefitCardProps {
  title: string
  icon: React.ReactNode
  className?: string
}

export function BenefitCard({ title, icon, className }: BenefitCardProps) {
  return (
    <Card className={cn("rounded-xl p-4 shadow-lg text-center w-full h-72 flex flex-col bg-white", className)}>
      <CardContent className="p-0 flex flex-col h-full">
        <div className="w-12 h-12 bg-white border-2 border-linkme-primary rounded-lg flex items-center justify-center mx-auto mt-2 mb-4">
          {icon}
        </div>
        <div className="flex-1 flex items-center justify-center px-2">
          <h4 className="font-bold text-gray-800 text-sm leading-tight">{title}</h4>
        </div>
      </CardContent>
    </Card>
  )
}

// Pre-defined benefit icons
export const BenefitIcons = {
  priority: (
    <svg className="w-6 h-6 fill-linkme-primary" viewBox="0 0 24 24">
      <path d="M6 10v-4c0-3.313 2.687-6 6-6s6 2.687 6 6v4h1c1.104 0 2 .896 2 2v8c0 1.104-.896 2-2 2H5c-1.104 0-2-.896-2-2v-8c0-1.104.896-2 2-2h1zm2 0h8v-4c0-2.206-1.794-4-4-4s-4 1.794-4 4v4z"/>
    </svg>
  ),
  visibility: (
    <svg className="w-6 h-6 fill-linkme-primary" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  positioning: (
    <svg className="w-6 h-6 fill-linkme-primary" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
  network: (
    <svg className="w-6 h-6 fill-linkme-primary" viewBox="0 0 24 24">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  ),
  influence: (
    <svg className="w-6 h-6 fill-linkme-primary" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
    </svg>
  ),
}
