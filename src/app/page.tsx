import RestaurantsWithTag from "@/components/RestaurantsWithTag";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <RestaurantsWithTag tag="japanese"></RestaurantsWithTag>
    </main>
  );
}
