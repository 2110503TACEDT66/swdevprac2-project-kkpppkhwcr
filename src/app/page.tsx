import RestaurantsWithTag from "@/components/RestaurantsWithTag";

export default function Home() {
  return (
    <main className="flex flex-col gap-2">
      <RestaurantsWithTag tag="japanese"></RestaurantsWithTag>
      <RestaurantsWithTag tag="thai"></RestaurantsWithTag>
    </main>
  );
}
