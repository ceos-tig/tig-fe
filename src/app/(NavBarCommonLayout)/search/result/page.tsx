'use client';
import SearchHeader from '@components/all/SearchHeader';
import Tabs from '@components/all/Tabs/Tabs';
import BottomSheet from '@components/search/result/BottomSheet';
import FilterHeader from '@components/search/result/FilterHeader';
import NaverMap from '@components/search/result/NaverMap';
import NoSearchResult from '@components/search/result/NoSearchResult';
import PinCard from '@components/search/result/PinCard';
import { allleisureArray } from '@constant/constant';
import { formatDate, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSearchParams } from 'next/navigation';
import { useSearchResult } from '@hooks/search/result/useSearchResult';

const isResult = true;

export default function Page() {
  const tabArray = allleisureArray;
  const searchParams = useSearchParams();
  const { search, date, adultCount, teenagerCount, kidsCount } =
    Object.fromEntries(searchParams.entries());
  const parsedDate = parse(date, "yyyy-MM-dd'T'HH:mm:ss", new Date());
  const formattedDate = formatDate(parsedDate, 'M.dd (EEE)', { locale: ko });
  const {
    currentLocation,
    filteredSearchResult,
    handleMyLocation,
    pinCardIndex,
    isBottomSheetOpen,
  } = useSearchResult(search);

  return (
    <main className="w-full h-full flex justify-center items-center text-[200px]">
      <SearchHeader
        result
        placeholder={`${search}, ${formattedDate}${
          adultCount === '0' ? '' : `, 성인 ${adultCount}명`
        }${teenagerCount === '0' ? '' : `, 청소년 ${teenagerCount}명`}${
          kidsCount === '0' ? '' : `, 어린이 ${kidsCount}명 `
        }`}
        isHomeOrResultPage
      />
      <Tabs
        tabArray={tabArray}
        rounded
        from="search"
        className="w-full px-5 top-[58px]"
      />
      <FilterHeader />
      {isResult && (
        <NaverMap
          locationArray={filteredSearchResult.map((result) => ({
            latitude: result.latitude || 0,
            longitude: result.longitude || 0,
          }))}
          currentLatitude={currentLocation.latitude}
          currentLongitude={currentLocation.longitude}
        />
      )}
      {isResult && isBottomSheetOpen && (
        <BottomSheet
          results={filteredSearchResult}
          handleMyLocation={handleMyLocation}
        />
      )}
      {!isBottomSheetOpen && (
        <PinCard
          PinCard={filteredSearchResult[pinCardIndex]}
          handleMyLocation={handleMyLocation}
        />
      )}
      {!isResult && <NoSearchResult />}
    </main>
  );
}
