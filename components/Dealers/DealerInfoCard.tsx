import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DealerProps } from "@/types";

export function DealerInfoCard( dealer: DealerProps ) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dealer Info</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm text-muted-foreground">
        <p><strong>Phone:</strong> {dealer.phone || "N/A"}</p>
        <p><strong>Email:</strong> {dealer.email || "N/A"}</p>
        <p><strong>Address:</strong> {dealer.address || "N/A"}</p>
      </CardContent>
    </Card>
  );
}
