import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface FeatureCardProps {
  title: string
  description: string
  icon?: string
  iconAlt?: string
  className?: string
  children?: React.ReactNode
}

export function FeatureCard({
  title,
  description,
  icon,
  iconAlt = "Feature icon",
  className,
  children
}: FeatureCardProps) {
  return (
    <Card className={cn("p-6 bg-gray-50 rounded-2xl shadow text-center", className)}>
      <CardContent className="p-0">
        {icon && (
          <Image
            src={icon}
            alt={iconAlt}
            width={75}
            height={70}
            className="mx-auto mb-4"
          />
        )}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        {children}
      </CardContent>
    </Card>
  )
}

// Variant for target audience cards with bullet lists
interface AudienceCardProps {
  title: string
  icon?: string
  iconAlt?: string
  subtitle?: string
  items: string[]
  className?: string
  children?: React.ReactNode
}

export function AudienceCard({
  title,
  icon,
  iconAlt = "Audience icon",
  subtitle,
  items,
  className,
  children
}: AudienceCardProps) {
  return (
    <Card className={cn("p-8 rounded-3xl shadow-lg bg-white", className)}>
      <CardContent className="p-0">
        <div className="flex items-center mb-4 gap-3">
          {icon && (
            <Image src={icon} alt={iconAlt} width={50} height={50} />
          )}
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        {subtitle && <p className="text-gray-600 mb-4">{subtitle}</p>}
        {children}
        <ul className="text-gray-700 space-y-2 text-left">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-linkme-primary font-bold">•</span>
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
