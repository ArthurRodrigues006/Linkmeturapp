import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  highlight?: string
  className?: string
  align?: "left" | "center" | "right"
}

export function SectionHeader({
  title,
  subtitle,
  highlight,
  className,
  align = "center"
}: SectionHeaderProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  }

  return (
    <div className={cn("mb-12", alignClass[align], className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
        {title}
        {highlight && (
          <span className="relative inline-block ml-2">
            {highlight}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-linkme-primary rounded-full" />
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
