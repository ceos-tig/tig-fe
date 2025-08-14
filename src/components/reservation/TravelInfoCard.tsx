import InfoCard from '@components/all/InfoCard';
import { useState } from 'react';
import { useSelectedDate } from '@store/selectedDateStore';
import DateTimePicker from './DateTimePicker';
import DateTimePickerModal from './DateTimePickerModal';
import { formatDateKor, formatTime } from '@utils/formatDate';

type TravelType = '왕복' | '편도';

interface TravelInfoCardProps {
  travelType: TravelType;
}

export default function TravelInfoCard({ travelType }: TravelInfoCardProps) {
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);
  const [openReturnTime, setOpenReturnTime] = useState(false);

  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [departureTime, setDepartureTime] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [returnTime, setReturnTime] = useState<string | null>(null);

  const selectedDateStr = useSelectedDate((state) => state.selectedDate);
  const selectedDate = selectedDateStr ? new Date(selectedDateStr) : null;

  return (
    <section className="w-full flex flex-col p-5 mt-5 border-b border-grey2">
      <InfoCard number={2} content="여행 정보를 입력해주세요." />
      {/* 출발지, 도착지 */}

      <div className="flex gap-2 mt-6">
        <div className="w-full flex flex-col gap-3">
          <p className="title2 text-grey7">출발지</p>
          <input
            className="w-full py-5 px-4 rounded-[12px] border-[1px] body1 grey7 cursor-pointer border-grey3 focus:border-primary_orange1"
            placeholder="출발지 입력"
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <p className="title2 text-grey7">도착지</p>
          <input
            className="w-full py-5 px-4 rounded-[12px] border-[1px] body1 grey7 cursor-pointer border-grey3 focus:border-primary_orange1"
            placeholder="도착지 입력"
          />
        </div>
      </div>

      <DateTimePicker
        label="가는"
        date={departureDate}
        time={departureTime}
        onDateClick={() => setOpen(true)}
        onTimeClick={() => setOpenTime(true)}
        formatDate={formatDateKor}
        formatTime={formatTime}
      />

      {travelType === '왕복' && (
        <DateTimePicker
          label="오는"
          date={returnDate}
          time={returnTime}
          onDateClick={() => setOpenReturn(true)}
          onTimeClick={() => setOpenReturnTime(true)}
          formatDate={formatDateKor}
          formatTime={formatTime}
        />
      )}

      {/* 가는 날 날짜 선택 모달 */}
      <DateTimePickerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setDepartureDate(selectedDate);
          setOpen(false);
        }}
        type="date"
      />

      {/* 가는 날 시간 선택 모달 */}
      <DateTimePickerModal
        isOpen={openTime}
        onClose={() => setOpenTime(false)}
        onConfirm={() => setOpenTime(false)}
        type="time"
        onTimeSelect={(time) => setDepartureTime(time)}
      />

      {/* 오는 날 날짜 선택 모달 */}
      {travelType === '왕복' && (
        <DateTimePickerModal
          isOpen={openReturn}
          onClose={() => setOpenReturn(false)}
          onConfirm={() => {
            setReturnDate(selectedDate);
            setOpenReturn(false);
          }}
          type="date"
        />
      )}

      {/* 오는 날 시간 선택 모달 */}
      {travelType === '왕복' && (
        <DateTimePickerModal
          isOpen={openReturnTime}
          onClose={() => setOpenReturnTime(false)}
          onConfirm={() => setOpenReturnTime(false)}
          type="time"
          onTimeSelect={(time) => setReturnTime(time)}
        />
      )}
    </section>
  );
}
