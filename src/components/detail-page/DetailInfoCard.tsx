'use client';
import DetailEmptyHeartSVG from '@public/svg/detailEmptyHeart.svg';
import DetailFillHeartSVG from '@public/svg/detailFillHeart.svg';
import DetailPageStarSVG from '@public/svg/detailPageStar.svg';
import LocationPingSVG from '@public/svg/locationPing.svg';
import CardSVG from '@public/svg/card.svg';
import TimeSVG from '@public/svg/time.svg';
import CallSVG from '@public/svg/call.svg';
import SnsSVG from '@public/svg/sns.svg';
import { forwardRef, useEffect, useState } from 'react';
import { categoryMapEngToKor } from '@constant/constant';
import { useDeleteFromWishList } from '@apis/wishlist/deleteFromWishlist';
import { useAddToWishList } from '@apis/wishlist/addToWishList';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PricesInfo, operatingHour } from '@apis/reservation/getClubResInfo';
import { formatDate } from 'date-fns';
import PriceCard from './PriceCard';

interface DetailInfoCardProps {
  clubId: string;
  category: string;
  clubName: string;
  avgRating: number;
  ratingCount: number;
  address: string;
  isHeart: boolean;
  type: 'TIME' | 'GAME';
  prices: PricesInfo;
  businessHours: string;
  phoneNumber: string;
  snsLink: string | null;
  operatingHours: operatingHour[];
  date: string;
}

// eslint-disable-next-line react/display-name
export const DetailInfoCard = forwardRef<HTMLDivElement, DetailInfoCardProps>(
  (
    {
      clubId,
      category,
      clubName,
      avgRating,
      ratingCount,
      address,
      isHeart,
      businessHours,
      type,
      prices,
      phoneNumber,
      snsLink = '/',
      operatingHours = [],
      date,
    },
    ref
  ) => {
    const router = useRouter();
    const todayOperatingHour = operatingHours.find(
      (operatingHour) =>
        operatingHour.dayOfWeek ===
        formatDate(new Date(date), 'EEE').toUpperCase()
    );
    const { mutate: deleteFromWishList } = useDeleteFromWishList();
    const { mutate: addToWishList } = useAddToWishList();
    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const handleEmptyHeartClick = () => {
      if (isHeart === null) {
        router.push('/login');
        return;
      }
      addToWishList(parseInt(clubId));
      setIsHeartClicked(true);
    };
    const handleFillHeartClick = () => {
      deleteFromWishList(parseInt(clubId));
      setIsHeartClicked(false);
    };
    useEffect(() => {
      setIsHeartClicked(isHeart);
    }, [isHeart]);
    return (
      <section className="w-full px-5 py-[30px] flex flex-col gap-6 border-b border-grey2">
        <div className="flex flex-col gap-[2px]">
          <p className="text-grey5 title4">{categoryMapEngToKor[category]}</p>
          <div className="w-full justify-between items-center flex">
            <p className="headline1">{clubName}</p>
            {isHeartClicked && (
              <DetailFillHeartSVG
                onClick={handleFillHeartClick}
                className="cursor-pointer"
              />
            )}
            {!isHeartClicked && (
              <DetailEmptyHeartSVG
                onClick={handleEmptyHeartClick}
                className="cursor-pointer"
              />
            )}
          </div>
          {ratingCount !== 0 && (
            <div className="flex gap-[4px] text-primary_orange1 headline2 mt-[6px]">
              <DetailPageStarSVG />
              <p>{avgRating}</p>
              <p>({ratingCount})</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[10px] body2 text-grey7">
          <div className="flex gap-2">
            <LocationPingSVG />
            <p className="body2">{address}</p>
          </div>
          {/* <div className="flex gap-2">
            <CardSVG />
            <p className="body2">
              {type === 'TIME' ? '시간' : '게임'}당{' '}
              {price && price.toLocaleString()}원
            </p>
          </div> */}
          <div className="flex gap-2" ref={ref}>
            <TimeSVG />
            <p className="body2">
              {todayOperatingHour?.startTime.slice(0, 5) || ''}
              {todayOperatingHour && ' ~ '}{' '}
              {todayOperatingHour?.endTime.slice(0, 5) || ''}
            </p>
          </div>
          <div className="flex gap-2">
            <CallSVG />
            <p className="body2">{phoneNumber}</p>
          </div>
          {/* <div className="flex gap-2">
            <SnsSVG />
            <p className="body2">
              {snsLink ? <Link href={snsLink}>{snsLink}</Link> : <p>-</p>}
            </p>
          </div> */}
        </div>
        <PriceCard prices={prices} category={category} date={date} />
      </section>
    );
  }
);
