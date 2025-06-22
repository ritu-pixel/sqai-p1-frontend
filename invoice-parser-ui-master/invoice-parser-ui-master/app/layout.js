import './globals.css';
export const metadata = {
  title: 'AI Invoice Parser',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
