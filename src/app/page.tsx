import { HeroBanner } from "@/src/components/molecules/HeroBanner/HeroBanner";
import { DrinksCatalog } from "@/src/components/organisms/DrinksCatalog/DrinksCatalog";
import { PageNav } from "@/src/components/organisms/PageNav/PageNav";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <main className="wrapper">
        <PageNav />
        <h2 className="section-heading">Recipes</h2>
        <DrinksCatalog />
      </main>
    </div>
  );
}
