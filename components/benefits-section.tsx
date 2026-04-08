import { Wind, DollarSign, Truck, Wrench } from "lucide-react"

const benefits = [
  {
    icon: Wind,
    title: "Superior Airflow",
    description: "Engineered for maximum air intake, delivering noticeable power gains over the restrictive stock airbox."
  },
  {
    icon: Wrench,
    title: "GYTR Filter Compatible",
    description: "Uses the same high-performance air filter as the GYTR box. Easy maintenance with widely available parts."
  },
  {
    icon: DollarSign,
    title: "No Tariffs",
    description: "Made in America means no import duties or surprise fees. What you see is what you pay."
  },
  {
    icon: Truck,
    title: "Ships Fast",
    description: "No overseas shipping delays or backorders. Get your airbox when you need it, not months later."
  }
]

export function BenefitsSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase mb-4">
            Why Artless?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Skip the backorder. Beat the tariffs. Get better performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title}
              className="text-center p-6 border border-border rounded bg-background/50 hover:border-accent/50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground uppercase tracking-wide mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
