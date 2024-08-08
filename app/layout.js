import {Inter} from 'next/font/google';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'Server Action CRUD',
    description: 'Server Action CRUD APP',
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
      {children}
      </body>
      </html>
  );
}
