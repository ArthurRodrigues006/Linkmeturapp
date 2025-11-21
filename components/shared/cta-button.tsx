import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CTAButtonProps {
  children: React.ReactNode
  href: string
  className?: string
  size?: "default" | "lg" | "xl"
  variant?: "primary" | "outline"
}

export function CTAButton({
  children,
  href,
  className,
  size = "lg",
  variant = "primary"
}: CTAButtonProps) {
  const sizeClasses = {
    default: "px-6 py-2",
    lg: "px-8 py-3 text-lg",
    xl: "px-10 py-4 text-xl"
  }

  const variantClasses = {
    primary: "bg-linkme-primary hover:bg-linkme-primary-hover text-black",
    outline: "bg-transparent border-2 border-linkme-primary text-linkme-primary hover:bg-linkme-primary hover:text-black"
  }

  return (
    <Button
      asChild
      className={cn(
        "rounded-full font-semibold transition-all duration-200",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </Button>
  )
}

// WhatsApp CTA with pre-filled message
export function WhatsAppCTA({
  children,
  message = "Quero fazer parte da LinkMe Tur",
  className,
  size = "lg"
}: Omit<CTAButtonProps, "href" | "variant"> & { message?: string }) {
  const encodedMessage = encodeURIComponent(message)
  const href = `https://wa.me/555599623685?text=${encodedMessage}`

  return (
    <CTAButton href={href} className={className} size={size}>
      {children}
    </CTAButton>
  )
}
