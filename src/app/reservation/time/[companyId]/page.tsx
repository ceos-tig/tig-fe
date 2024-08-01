'use client';

import { useEffect, useState } from 'react';
import Header from '@components/all/Header';
import MakeResButtonCard from '@components/reservation/MakeResButtonCard';
import RequestCard from '@components/reservation/RequestCard';
import ResDateCard from '@components/reservation/ResDateCard';
import ResPeopleCountCard from '@components/reservation/ResPeopleCountCard';
import ResReservationCard from '@components/reservation/ResReservationCard';
import RestimeCard from '@components/reservation/RestimeCard';
import {
  timeReservationInfoInitialState,
  useTimeReservationStore,
} from '@store/makeReservationInfo';
import { useGetClubResInfo } from '@apis/reservation/getClubResInfo';
import TigLoadingPage from '@components/all/TigLoadingPage';
import { addHours, formatDate, set } from 'date-fns';
import { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { useSelectedDate } from '@store/selectedDateStore';
import { timeToMinutes } from '@utils/formatDate';

const DUMMYPRICE = '10,000';

export default function Page({ params }: { params: { companyId: string } }) {
  const { data, isSuccess } = useGetClubResInfo(params.companyId);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [clubName, setClubName] = useState('');
  const [address, setAddress] = useState('');
  const searchParam = useSearchParams();

  const timeReservationInfo = useTimeReservationStore(
    (state) => state.timeReservationInfo
  );

  const setTimeReservationInfo = useTimeReservationStore(
    (state) => state.setTimeReservationInfo
  );
  const setSelectedDate = useSelectedDate((state) => state.setSelectedDate);
  const selectedDate = useSelectedDate((state) => state.selectedDate);

  useEffect(() => {
    if (isSuccess) {
      setStartTime(data?.result.businessHours.slice(0, 5) || '10:00');
      setEndTime(data?.result.businessHours.slice(8, 13) || '20:00');
      setClubName(data?.result.clubName || '');
      setAddress(data?.result.address || '');
      setTimeReservationInfo({
        ...timeReservationInfo,
        date: searchParam.get('date') || '',
      });
      setSelectedDate(searchParam.get('date') || '');
    }
    // 언마운트될 때 다시 초기화
    return () => setTimeReservationInfo(timeReservationInfoInitialState);
  }, [data]);

  useEffect(() => {
    const now = formatDate(addHours(new Date(), 1), 'HH:00');
    if (
      timeToMinutes(data?.result.businessHours?.slice(0, 5) || '10:00') <
        timeToMinutes(now) &&
      selectedDate.slice(0, 10) === formatDate(new Date(), 'yyyy-MM-dd')
    ) {
      setStartTime(now);
    } else {
      setStartTime(data?.result.businessHours.slice(0, 5) || '10:00');
    }
    setEndTime(data?.result.businessHours.slice(8, 13) || '20:00');
  }, [selectedDate]);


  if (!isSuccess) return <TigLoadingPage />;
  return (
    <main className="w-full h-full overflow-y-scroll flex flex-col ">
      <Header buttonType="back" isCenter title="예약하기" />
      <ResDateCard />
      <RestimeCard startTime={startTime} endTime={endTime} />
      <ResPeopleCountCard />
      <RequestCard />
      <MakeResButtonCard
        clubName={clubName}
        address={address}
        clubStartTime={startTime}
      />
      <Toaster position="bottom-center" containerStyle={{ bottom: '90px' }} />
    </main>
  );
}
