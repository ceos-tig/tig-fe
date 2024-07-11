'use client';
import Header from '@components/all/Header';
import Tabs from '@components/all/Tabs/Tabs';
import {DetailInfoCard} from '@components/detail-page/DetailInfoCard';
import ResButtonCard from '@components/detail-page/ResButtonCard';
import { ServicesCard } from '@components/detail-page/ServicesCard';
import { VisitedReviewCard } from '@components/detail-page/VisitedReviewCard';
import { detailArray } from '@constant/constant';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useTab from '@store/tabNumberStore';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ReviewLowerSectionProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';

interface DetailPageProps {
  imageUrl: string[];
  clubType: string;
  clubName: string;
  AvgRating: number;
  RatingCount: number;
  location: string;
  GameType: 'time' | 'game';
  price: string;
  startTime: string;
  endTime: string;
  phoneNumber: string;
  sns: string;
  servicesIcon: string[];
  services: string[];
  reviewList: ReviewLowerSectionProps[];
}

const DUMMYDetailPage: DetailPageProps = {
  imageUrl: ['/png/dummyDetailImage.png'],
  clubType: '볼링장',
  clubName: '스카이락 볼링장',
  AvgRating: 4.5,
  RatingCount: 100,
  location: '서울 서대문구 신촌로 73 케이스퀘어 8층',
  GameType: 'time',
  price: '10,000',
  startTime: '10:00',
  endTime: '22:00',
  phoneNumber: '02-1234-5678',
  sns: 'https://www.instagram.com/',
  servicesIcon: ['wifi', 'wifi', 'wifi', 'wifi'],
  services: ['무선 인터넷', '무선 인터넷', '무선 인터넷', '무선 인터넷'],
  reviewList: [
    {
      eventDate: '05.17 (금)',
      adultCount: 2,
      reservationUserName: '김티그',
      rating: 4,
      rateContent:
        '역 근처에 시설도 깔끔하고 좋아요! 신촌 볼링장 하면 꼭 여기로 가요. 직원분들도 친절하고 레일도 많고 최고! 담에 친구들이랑 단체 모임하면 또 갈게요~!',
    },
    {
      eventDate: '05.17 (금)',
      adultCount: 2,
      reservationUserName: '김티그',
      rating: 4,
      rateContent:
        '역 근처에 시설도 깔끔하고 좋아요! 신촌 볼링장 하면 꼭 여기로 가요. 직원분들도 친절하고 레일도 많고 최고! 담에 친구들이랑 단체 모임하면 또 갈게요~!',
    },
    {
      eventDate: '05.17 (금)',
      adultCount: 2,
      reservationUserName: '김티그',
      rating: 4,
      rateContent:
        '역 근처에 시설도 깔끔하고 좋아요! 신촌 볼링장 하면 꼭 여기로 가요. 직원분들도 친절하고 레일도 많고 최고! 담에 친구들이랑 단체 모임하면 또 갈게요~!',
    },
    {
      eventDate: '05.17 (금)',
      adultCount: 2,
      reservationUserName: '김티그',
      rating: 4,
      rateContent:
        '역 근처에 시설도 깔끔하고 좋아요! 신촌 볼링장 하면 꼭 여기로 가요. 직원분들도 친절하고 레일도 많고 최고! 담에 친구들이랑 단체 모임하면 또 갈게요~!',
    },
  ],
};

export default function Page() {
  const tabArray = detailArray;
  // const imageRef = useRef<HTMLImageElement>(null);
  const detailInfoRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  // const visitedReviewRef = useRef<HTMLDivElement>(null);
  const selectedTab = useTab((state) => state.selectedTab);
  const setSelectedTab = useTab((state) => state.setSelectedTab);
  // useIntersectionObserver(imageRef, () => setSelectedTab('기본정보'),1);
  // useIntersectionObserver(visitedReviewRef, () => setSelectedTab('방문자 리뷰'),1);
  useEffect(() => {
    if (selectedTab === '기본정보') {
      scrollToDetailInfoRef();
    } else if (selectedTab === '편의시설') {
      scrollToServiceRef();
    } else if (selectedTab === '방문자 리뷰') {
      scrollToReviewRef();
    } else {
    }
  }, [selectedTab]);

  const scrollToDetailInfoRef = () => {
    if (detailInfoRef.current) {
      detailInfoRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  const scrollToServiceRef = () => {
    if (serviceRef.current) {
      serviceRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  const scrollToReviewRef = () => {
    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  return (
    <main className="w-full h-full overflow-y-scroll">
      <Header buttonType="back" title="업체명" />
      <Tabs tabArray={tabArray} from="detail" className="top-[68px]" />
      <div ref={detailInfoRef} />
      <Image
        src="/png/dummyDetailImage.png"
        alt="dummyImage"
        width={320}
        height={240}
        className="w-full p-5 pt-[138px]"
        // ref={imageRef}
      />
      {/* <div className='w-sevenEightWidth h-[80px] bg-primary_orange2 rounded-[10px] mt-[10px] mx-auto'/> */}
      <DetailInfoCard {...DUMMYDetailPage} ref={serviceRef}/>
      <ServicesCard
        servicesIcon={DUMMYDetailPage.servicesIcon}
        services={DUMMYDetailPage.services}
        ref={reviewRef}
      />
      <VisitedReviewCard
        reviewList={DUMMYDetailPage.reviewList}
        AvgRating={DUMMYDetailPage.AvgRating}
        RatingCount={DUMMYDetailPage.RatingCount}
        // ref={visitedReviewRef}
      />
      <ResButtonCard />
    </main>
  );
}
