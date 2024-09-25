'use client';
import Modal from '@components/all/Modal';
import Tabs from '@components/all/Tabs/Tabs';
import {
  baseballArray,
  categoryMapEngToKor,
  golfArray,
  homeleisureArray,
  leisureArray,
  pocketballArray,
  squashArray,
  tennisArray,
} from '@constant/constant';
import SearchHeader from '@components/all/SearchHeader';
import HomeBannerSVG from '@public/svg/homeBanner.svg';
import HomeCardList from '@components/home/HomeCardList';
import { usePostHome } from '@apis/home/postHome';
import TigLoadingPage from '@components/all/TigLoadingPage';
import useGeolocation from '@hooks/home/useGeoLocation';
import Footer from '@components/all/Footer/Footer';
import useTab from '@store/tabNumberStore';
import { useEffect } from 'react';
import UITabs from '@components/all/UITabs/UITabs';
import FilterHeader from '@components/search/result/FilterHeader';
import ResultCard from '@components/all/ResultCard';

export default function Home({ params }: { params: { gametype: string } }) {
  const currentTab = useTab((state) => state.selectedTab);
  const subtabArray =
    currentTab === '스크린골프'
      ? golfArray
      : currentTab === '당구'
      ? pocketballArray
      : currentTab === '야구'
      ? baseballArray
      : currentTab === '스쿼시'
      ? squashArray
      : currentTab === '테니스'
      ? tennisArray
      : [];
  const setCurrentTab = useTab((state) => state.setSelectedTab);
  const tabArray = leisureArray;
  const { mutate, isSuccess } = usePostHome();
  const { clubCards, recommendClubCards } = useGeolocation(mutate);
  console.log(clubCards);

  useEffect(() => {
    setCurrentTab(categoryMapEngToKor[params.gametype]);
  });

  return (
    <main className="h-full w-full flex flex-col overflow-y-scroll pb-[40px]">
      <SearchHeader isHomeOrResultPage />
      {!isSuccess && <TigLoadingPage />}
      {isSuccess && (
        <>
          <UITabs
            tabArray={tabArray}
            from="searchMain"
            className="w-full px-5 top-[58px]"
          />
          <Tabs
            tabArray={subtabArray}
            from="searchSub"
            className="w-full px-5 top-[148px]"
            rounded
          />
          <FilterHeader />
          <div className='pt-[232px]'></div>
          {clubCards.map((clubCard, idx) => {
            if (idx === 0)
              return <ResultCard key={clubCard.id} {...clubCard} isFirst />;
            if (idx === clubCards.length - 1)
              return <ResultCard key={clubCard.id} {...clubCard} isLast />;
            return <ResultCard key={clubCard.id} {...clubCard} />;
          })}
          {/* <div className="w-full max-w-[640px] mt-[111px] mb-5">
            <HomeBannerSVG className="w-full h-auto" />
          </div>
          {clubCards.length !== 0 && (
            <HomeCardList
              title="근처에서 즐길 수 있는 스포츠예요"
              Card={clubCards}
            />
          )} */}
          {/* <HomeCardList title="이런 스포츠 어때요?" Card={recommendClubCards} /> */}
          {/* <Footer /> */}
        </>
      )}
    </main>
  );
}
