import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CTABannerProps {
  title: string
  subtitle?: string
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  className?: string
}

export function CTABanner({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  className
}: CTABannerProps) {
  return (
    <section className={cn("py-16 bg-gray-900 text-white", className)}>
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-300 mb-8 text-lg">{subtitle}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-linkme-primary hover:bg-linkme-primary-hover text-black rounded-full px-8"
          >
            <a href={primaryAction.href} target="_blank" rel="noopener noreferrer">
              {primaryAction.label}
            </a>
          </Button>
          {secondaryAction && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 rounded-full px-8"
            >
              <a href={secondaryAction.href} target="_blank" rel="noopener noreferrer">
                {secondaryAction.label}
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
