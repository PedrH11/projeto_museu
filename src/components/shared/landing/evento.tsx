import { Card, CardContent } from "@/components/ui/card"

export function Events() {
  return (
    <section id="eventos" className="py-20 bg-muted/30">

      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold">
            Próximos Eventos
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {[1,2].map((i)=>(
            <Card key={i}>
              <CardContent className="flex gap-6 items-center p-6">

                <div className="text-center border rounded-lg px-4 py-3">
                  <p className="text-xs text-muted-foreground">MAR</p>
                  <p className="text-2xl font-bold">2{i}</p>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Workshop de Restauro
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Auditório • 14h
                  </p>
                </div>

              </CardContent>
            </Card>
          ))}

        </div>

      </div>
    </section>
  )
}