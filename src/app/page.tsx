import styles from "./page.module.css";
import { HeroBanner } from "@/componets/molecules/HeroBanner/HeroBanner";
import { DrinksGrid } from "@/componets/organisms/DrinksGrid/DrinksGrid";
import { DrinksFilter } from "@/componets/organisms/DrinksFilter/DrinksFilter";

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
