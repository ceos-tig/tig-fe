import NavBar from '@components/all/NavBar/NavBar';
import { cookies } from 'next/headers';

export default function NavBarCommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies();
  console.log(cookie.get('refreshToken'));

  return (
    <div className="w-full h-full">
      {children}
      <NavBar />
    </div>
  );
}
