import { cn } from "@/lib/utils"

interface StatItemProps {
  label: string
  value: string
  description: string
}

interface StatsSectionProps {
  title: string
  subtitle?: string
  stats: StatItemProps[]
  className?: string
}

export function StatsSection({ title, subtitle, stats, className }: StatsSectionProps) {
  return (
    <section className={cn("py-16 bg-white", className)}>
      <div className="max-w-6xl mx-auto px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{title}</h2>
        {subtitle && <p className="text-gray-600 mb-12">{subtitle}</p>}

        <div className={cn("grid gap-8", `md:grid-cols-${stats.length}`)}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ label, value, description }: StatItemProps) {
  return (
    <div className="text-center p-6">
      <span className="text-xs uppercase tracking-widest text-gray-500 font-medium block mb-2">
        {label}
      </span>
      <span className="text-5xl md:text-6xl font-bold text-black block mb-3">
        {value}
      </span>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

export { StatCard }
