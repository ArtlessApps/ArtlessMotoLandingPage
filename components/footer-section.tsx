export function FooterSection() {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="mb-2">
              <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase">Artless</span>
              <span className="ml-2 text-lg font-bold tracking-wider text-foreground">MOTO</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Performance parts, made in America.
            </p>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="mailto:hello@artlessmoto.com" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <span className="text-border">|</span>
            <span>Tenere 700 Airbox</span>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-xs">
            Artless Moto is not affiliated with Yamaha Motor Corporation. Tenere and GYTR are trademarks of Yamaha Motor Co., Ltd.
          </p>
        </div>
      </div>
    </footer>
  )
}
