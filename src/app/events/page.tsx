import { EventsGrid } from "@/src/components/organisms/EventsGrid/EventsGrid";
import { HeroBanner } from "@/src/components/molecules/HeroBanner/HeroBanner";
import { PageNav } from "@/src/components/organisms/PageNav/PageNav";
import styles from "@/src/app/page.module.css";

export default function Events() {
  return (
    <div className={styles.page}>
      <HeroBanner />
      <main className={`wrapper ${styles.page}`}>
        <PageNav />
        <h2 className="section-heading">Events</h2>
        <EventsGrid />
      </main>
    </div>
  );
}
