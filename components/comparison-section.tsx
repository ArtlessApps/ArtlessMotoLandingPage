import { Check, X, Minus } from "lucide-react"

const features = [
  { feature: "Improved Airflow", artless: true, stock: false, gytr: true },
  { feature: "GYTR Air Filter Compatible", artless: true, stock: false, gytr: true },
  { feature: "Made in America", artless: true, stock: false, gytr: false },
  { feature: "No Import Tariffs", artless: true, stock: "partial", gytr: false },
  { feature: "In Stock / Ships Fast", artless: true, stock: true, gytr: false },
  { feature: "Affordable", artless: true, stock: true, gytr: false },
]

export function ComparisonSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase mb-4">
            The Smart Choice
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how Artless stacks up against the competition.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 text-muted-foreground font-normal text-sm uppercase tracking-wider">
                  Feature
                </th>
                <th className="text-center py-4 px-4">
                  <span className="text-accent font-bold uppercase tracking-wider">Artless</span>
                </th>
                <th className="text-center py-4 px-4 text-muted-foreground font-normal text-sm uppercase tracking-wider">
                  Stock
                </th>
                <th className="text-center py-4 px-4 text-muted-foreground font-normal text-sm uppercase tracking-wider">
                  GYTR
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((row) => (
                <tr key={row.feature} className="border-b border-border/50">
                  <td className="py-4 px-4 text-foreground">
                    {row.feature}
                  </td>
                  <td className="text-center py-4 px-4">
                    <StatusIcon status={row.artless} highlight />
                  </td>
                  <td className="text-center py-4 px-4">
                    <StatusIcon status={row.stock} />
                  </td>
                  <td className="text-center py-4 px-4">
                    <StatusIcon status={row.gytr} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function StatusIcon({ status, highlight = false }: { status: boolean | string; highlight?: boolean }) {
  if (status === true) {
    return (
      <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${highlight ? 'bg-accent/20 text-accent' : 'bg-green-500/20 text-green-400'}`}>
        <Check className="w-4 h-4" />
      </div>
    )
  }
  
  if (status === "partial") {
    return (
      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400">
        <Minus className="w-4 h-4" />
      </div>
    )
  }
  
  return (
    <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground">
      <X className="w-4 h-4" />
    </div>
  )
}
