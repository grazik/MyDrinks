export default function PdpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="wrapper">{children}</main>;
}
