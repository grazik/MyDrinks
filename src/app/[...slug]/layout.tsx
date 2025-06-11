import styles from "../page.module.css";

export default function PdpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={`wrapper ${styles.page}`}>{children}</main>;
}
