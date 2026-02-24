import { HeroBanner } from "@/src/components/molecules/HeroBanner/HeroBanner";
import { DrinksGrid } from "@/src/components/organisms/DrinksGrid/DrinksGrid";
import { DrinksFilter } from "@/src/components/organisms/DrinksFilter/DrinksFilter";
import { PageNav } from "@/src/components/organisms/PageNav/PageNav";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <main className="wrapper">
        <PageNav />
        <h2 className="section-heading">Recipes</h2>
        <DrinksFilter />
        <DrinksGrid />
      </main>
    </div>
  );
}
