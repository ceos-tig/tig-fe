'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type NavItemType } from 'types/all/NavTypes';
import { useState, useEffect } from 'react';
import useLocalStorageState from '@store/localStorageAccessTokenStore';

export default function NavItem({
  ActiveIcon,
  InactiveIcon,
  path,
}: NavItemType) {
  const pathname: string | null = usePathname();

  // const [localStorageAccessToken, setLocalStorageAccessToken] = useState<
  //   string | null
  // >(null);
  const localStorageAccessTokenState = useLocalStorageState(
    (state) => state.localStorageAccessTokenState
  );

  const setLocalStoraeAccessTokenState = useLocalStorageState(
    (state) => state.setLocalStorageAccessTokenState
  );

  useEffect(() => {
    setLocalStoraeAccessTokenState(localStorage.getItem('accessToken'));
  }, []);

  const targetPath =
    path !== '/mypage'
      ? path
      : localStorageAccessTokenState === null
      ? '/login'
      : '/mypage';

  const isActive =
    pathname === '/'
      ? pathname === targetPath
        ? true
        : false
      : targetPath === '/'
      ? false
      : pathname?.startsWith(targetPath)
      ? true
      : false;

  return (
    <Link href={targetPath} className="cursor-pointer">
      {isActive ? <ActiveIcon /> : <InactiveIcon />}
    </Link>
  );
}
