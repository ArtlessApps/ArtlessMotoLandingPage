import { HeroSection } from "@/components/hero-section"
import { BenefitsSection } from "@/components/benefits-section"
import { ComparisonSection } from "@/components/comparison-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <ComparisonSection />
      <FooterSection />
    </main>
  )
}
