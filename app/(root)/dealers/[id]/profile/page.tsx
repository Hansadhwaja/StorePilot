import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDealerById } from "@/lib/actions/dealerActions";
import React from "react";

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const dealer = await getDealerById(id);
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Dealer Info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-muted-foreground">
          <p>
            <strong>Phone:</strong> {dealer.phone || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {dealer.email || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {dealer.address || "N/A"}
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfilePage;
