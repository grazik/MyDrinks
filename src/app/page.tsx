import styles from "./page.module.css";
import { HeroBanner } from "@/componets/molecules/HeroBanner/HeroBanner";
import { DrinksGrid } from "@/componets/organisms/DrinksGrid/DrinksGrid";
import { Pill } from "@/componets/atoms/Pill/Pill";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroBanner />
      <main className={`wrapper ${styles.page}`}>
        <h1 className="section-heading">Recipes</h1>
        <Pill>Whisky</Pill>
        <DrinksGrid />
      </main>
    </div>
  );
}
