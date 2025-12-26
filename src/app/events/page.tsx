import styles from "@/src/app/page.module.css";
import { EventsGrid } from "@/src/components/organisms/EventsGrid/EventsGrid";

export default function Events() {
  return (
    <div className={styles.page}>
      <main className={`wrapper ${styles.page}`}>
        <h2 className="section-heading">Events</h2>
        <EventsGrid />
      </main>
    </div>
  );
}
