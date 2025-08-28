import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DealerStatsCardsProps {
  totalPurchased: number;
  totalPaid: number;
  due: number;
}

export async function DealerStatCards({
  totalPurchased,
  totalPaid,
  due,
}: DealerStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border rounded-xl shadow-sm hover:shadow-lg transition-all bg-card border-muted">
        <CardHeader className="pb-2 border-b border-muted/50">
          <CardTitle className="text-md md:text-lg font-semibold text-foreground">
            Total Purchases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl md:text-4xl font-bold text-foreground">
            ₹{totalPurchased}
          </p>
        </CardContent>
      </Card>

      <Card className="border rounded-xl shadow-sm hover:shadow-lg transition-all bg-card border-muted">
        <CardHeader className="pb-2 border-b border-muted/50">
          <CardTitle className="text-md md:text-lg font-semibold text-foreground">
            Total Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl md:text-4xl font-bold text-foreground">
            ₹{totalPaid}
          </p>
        </CardContent>
      </Card>

      <Card className="border rounded-xl shadow-sm hover:shadow-lg transition-all bg-card border-muted">
        <CardHeader className="pb-2 border-b border-muted/50">
          <CardTitle
            className={`text-md md:text-lg font-semibold ${
              due > 0 ? "text-destructive" : "text-success"
            }`}
          >
            Outstanding Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={`text-3xl md:text-4xl font-bold ${
              due > 0 ? "text-destructive" : "text-success"
            }`}
          >
            ₹{due}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
