import type { Metadata } from "next";
import { getVehicles } from "@/lib/vehicles";
import { InventoryBrowser } from "@/components/inventory-browser";

export const metadata: Metadata = {
  title: "Inventory — Used Cars for Sale",
  description:
    "Browse our full inventory of affordable used cars, trucks, and SUVs. Search and filter by make, model, price, and more.",
};

export default async function InventoryPage() {
  const vehicles = await getVehicles();

  return (
    <div className="bg-ink-50">
      <div className="container-page py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-ink-900">
            Our Inventory of Affordable Used Cars
          </h1>
          <p className="mt-3 text-ink-500">
            Find your next vehicle here. We have a wide selection of makes and
            models to fit every budget.
          </p>
        </div>

        <div className="mt-10">
          <InventoryBrowser vehicles={vehicles} />
        </div>
      </div>
    </div>
  );
}
