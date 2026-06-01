export type VehicleCondition = "Excellent" | "Very Good" | "Good" | "Fair";

export type FuelType = "Gasoline" | "Diesel" | "Hybrid" | "Electric";

export type Transmission = "Automatic" | "Manual";

export type BodyType =
  | "Sedan"
  | "SUV"
  | "Truck"
  | "Coupe"
  | "Hatchback"
  | "Van"
  | "Convertible"
  | "Wagon";

export interface Vehicle {
  id: string;
  slug: string;
  year: number;
  make: string;
  model: string;
  trim: string | null;
  body_type: BodyType;
  price: number;
  down_payment: number | null;
  mileage: number;
  condition: VehicleCondition;
  fuel_type: FuelType;
  transmission: Transmission;
  drivetrain: string | null;
  exterior_color: string | null;
  interior_color: string | null;
  vin: string | null;
  description: string;
  features: string[];
  images: string[];
  warranty: string | null;
  is_featured: boolean;
  is_sold: boolean;
  created_at: string;
}

export interface NewVehicle
  extends Omit<Vehicle, "id" | "created_at" | "slug"> {
  id?: string;
  slug?: string;
}

export type LeadType = "contact" | "reserve" | "buy" | "test_drive";

export interface Lead {
  id?: string;
  type: LeadType;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  vehicle_id: string | null;
  vehicle_label: string | null;
  created_at?: string;
}

export interface FinancingApplication {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  employment_status: string;
  annual_income: number | null;
  desired_vehicle: string | null;
  down_payment_budget: number | null;
  notes: string | null;
  created_at?: string;
}
