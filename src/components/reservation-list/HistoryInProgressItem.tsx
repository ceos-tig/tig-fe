import FullButton from '@components/all/FullButton';
import HistoryComponentUpperSection from './all/HistoryComponentUpperSection';
import { HistoryInProgressItemProps } from 'types/reservation-list/ReservationListPageTypes';

export default function HistoryInProgressItem({
  imageUrl,
  companyName,
  companyAddress,
  eventDate,
  eventStartTime,
  eventEndTime,
  adultCount,
  youngManCount,
  kidCount,
  reservationStatus,
}: HistoryInProgressItemProps) {
  return (
    <div className="w-eightNineWidth h-fit p-5 gap-y-6 flex flex-col justify-between items-center shadow-myPageLogoutButton rounded-[10px]">
      <HistoryComponentUpperSection
        companyName={companyName}
        companyAddress={companyAddress}
        eventDate={eventDate}
        eventStartTime={eventStartTime}
        eventEndTime={eventEndTime}
        adultCount={adultCount}
        youngManCount={youngManCount}
        kidCount={kidCount}
      />
      {reservationStatus === 'inProgress' && (
        <div className="w-sevenEightWidth h-fit flex gap-[10px]">
          <FullButton
            bgColor="white"
            color="status_red1"
            size="sm"
            content="예약 취소"
            className="shadow-cancelButton"
          />
          <FullButton
            bgColor="primary_orange2"
            color="primary_orange1"
            size="sm"
            content="예약 확인중"
          />
        </div>
      )}
      {reservationStatus === 'canceled' && (
        <div className="w-sevenEightWidth h-fit">
          <FullButton
            bgColor="status_red1_opacity"
            color="status_red1"
            size="sm"
            content="예약 취소됨"
          />
        </div>
      )}
      {reservationStatus === 'confirmed' && (
        <div className="w-sevenEightWidth h-fit">
          <FullButton
            bgColor="primary_orange1"
            color="white"
            size="sm"
            content="예약 확정됨"
          />
        </div>
      )}
      {reservationStatus === 'denied' && (
        <div className="w-sevenEightWidth h-fit">
          <FullButton
            bgColor="grey3"
            color="white"
            size="sm"
            content="예약 거절됨"
          />
        </div>
      )}
    </div>
  );
}