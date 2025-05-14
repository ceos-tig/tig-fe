'use client';
import Tabs from '@components/all/Tabs/Tabs';
import { mainArray } from '@constant/constant';
import SearchHeader from '@components/all/SearchHeader';
import HomeCardList from '@components/home/HomeCardList';
import useGeolocation from '@hooks/home/useGeoLocation';
import Footer from '@components/all/Footer/Footer';
import { useScroll } from '@hooks/useScroll';
import useTab from '@store/tabNumberStore';
import SportsUIList from './SportsUIList';
import PackageUIList from './PackageUIList';

export default function HomeContent({
  isLogin,
  children,
}: {
  isLogin: boolean;
  children: React.ReactNode;
}) {
  const MAINARRAY = mainArray;
  const { clubCards, recommendClubCards } = useGeolocation(isLogin);
  const { isVisible } = useScroll();
  const currentTab = useTab((state) => state.selectedTab);

  return (
    <>
      <SearchHeader isHomeOrResultPage className="sticky" />
      <Tabs
        tabArray={MAINARRAY}
        from="home"
        className={`stickytransition-transform duration-300 ease-in-out z-[9] top-[58px] ${
          isVisible ? 'translate-y-0' : '-translate-y-300'
        }`}
      />
      {children}
      {currentTab === '스포츠' && <SportsUIList />}
      {currentTab === '패키지' && <PackageUIList />}
      {currentTab === '스포츠' && (
        <>
          <HomeCardList
            title="근처에서 즐길 수 있는 스포츠예요"
            Card={clubCards}
          />
          <HomeCardList title="이런 스포츠 어때요?" Card={recommendClubCards} />
        </>
      )}
      {currentTab === '패키지' && (
        <>
          <HomeCardList title="이런 곳은 어때요?" Card={clubCards} />
          <HomeCardList title="추천하는 서비스에요" Card={recommendClubCards} />
        </>
      )}
      <Footer />
    </>
  );
}
