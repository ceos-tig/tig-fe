import HistoryComponentUpperSection from '@components/reservation-list/all/HistoryComponentUpperSection';
import ReviewLowerSection from './ReviewLowerSection';
import { ReviewProps } from 'types/reservation-list/review/ReservationListReviewPageTypes';

export default function Review({
  imageUrl,
  companyName,
  companyAddress,
  eventDate,
  eventStartTime,
  eventEndTime,
  adultCount,
  youngManCount,
  kidCount,
  reservationUserName,
  rating,
  rateContent,
}: ReviewProps) {
  return (
    <div className="mt-5 p-5 rounded-[10px] w-eightNineWidth h-fit flex flex-col items-center gap-y-5 bg-white shadow-myPageLogoutButton">
      <HistoryComponentUpperSection
        imageUrl={imageUrl}
        companyName={companyName}
        companyAddress={companyAddress}
        eventDate={eventDate}
        eventStartTime={eventStartTime}
        eventEndTime={eventEndTime}
        adultCount={adultCount}
        youngManCount={youngManCount}
        kidCount={kidCount}
      />
      <div className="w-sevenEightWidth border-[1px] border-grey2" />

      <ReviewLowerSection
        reservationUserName={reservationUserName}
        eventDate={eventDate}
        adultCount={adultCount}
        youngManCount={youngManCount}
        kidCount={kidCount}
        rating={rating}
        rateContent={rateContent}
      />
    </div>
  );
}