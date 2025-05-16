import styles from "./page.module.css";
import { HeroBanner } from "@/componets/molecules/HeroBanner/HeroBanner";
import { DrinksGrid } from "@/componets/organisms/DrinksGrid/DrinksGrid";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroBanner />
      <main className={`wrapper ${styles.page}`}>
        <h1 className="section-heading">Recipes</h1>
        <DrinksGrid />
      </main>
    </div>
  );
}
