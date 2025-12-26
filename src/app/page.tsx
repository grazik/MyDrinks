import styles from "@/src/app/page.module.css";
import { HeroBanner } from "@/src/components/molecules/HeroBanner/HeroBanner";
import { DrinksGrid } from "@/src/components/organisms/DrinksGrid/DrinksGrid";
import { DrinksFilter } from "@/src/components/organisms/DrinksFilter/DrinksFilter";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroBanner />
      <main className={`wrapper ${styles.page}`}>
        <h2 className="section-heading">Recipes</h2>
        <DrinksFilter />
        <DrinksGrid />
      </main>
    </div>
  );
}
