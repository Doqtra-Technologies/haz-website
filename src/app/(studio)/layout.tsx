export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
