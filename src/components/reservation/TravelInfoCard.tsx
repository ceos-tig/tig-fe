import InfoCard from '@components/all/InfoCard';
import Calender from '@components/search/Calender';
import CalenderSVG from '@public/svg/reservation/calendar.svg';
import GreyCalendarSVG from '@public/svg/reservation/greyCalendar.svg';
import ClockSVG from '@public/svg/reservation/clock.svg';
import GreyClockSVG from '@public/svg/reservation/greyClock.svg';
import { useState } from 'react';
import { useSelectedDate } from '@store/selectedDateStore';
import TimePickerCard from '@components/search/TimePickerCard';

type TravelType = '왕복' | '편도';

interface TravelInfoCardProps {
  travelType: TravelType;
}

function formatDateKor(date: Date | null) {
  if (!date) return '';
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getMonth() + 1}.${date.getDate()}(${days[date.getDay()]})`;
}

function formatTime(time: string | null) {
  if (!time) return '';
  return time;
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
      <div className="flex gap-2 mt-6">
        <div className="w-full flex flex-col gap-3">
          <p className="title2 text-grey7">가는 날</p>
          <div
            className="w-full py-5 px-4 rounded-[12px] border-[1px] title2 cursor-pointer border-grey3 flex items-center gap-1"
            onClick={() => setOpen(true)}
          >
            {departureDate ? <CalenderSVG /> : <GreyCalendarSVG />}
            <p
              className={`body1 ${departureDate ? 'text-grey7' : 'text-grey3'}`}
            >
              {departureDate ? formatDateKor(departureDate) : '날짜 선택'}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <p className="title2 text-white">가는 시간</p>
          <div
            className="w-full py-5 px-4 rounded-[12px] border-[1px] title2 cursor-pointer border-grey3 flex items-center gap-1"
            onClick={() => setOpenTime(true)}
          >
            {departureTime ? <ClockSVG /> : <GreyClockSVG />}
            <p
              className={`body1 ${departureTime ? 'text-grey7' : 'text-grey3'}`}
            >
              {departureTime ? formatTime(departureTime) : '시간 선택'}
            </p>
          </div>
        </div>
      </div>
      {travelType === '왕복' && (
        <div className="flex gap-2 mt-6">
          <div className="w-full flex flex-col gap-3">
            <p className="title2 text-grey7">오는 날</p>
            <div
              className="w-full py-5 px-4 rounded-[12px] border-[1px] title2 cursor-pointer border-grey3 flex items-center gap-1"
              onClick={() => setOpenReturn(true)}
            >
              {returnDate ? <CalenderSVG /> : <GreyCalendarSVG />}
              <p
                className={`body1 ${returnDate ? 'text-grey7' : 'text-grey3'}`}
              >
                {returnDate ? formatDateKor(returnDate) : '날짜 선택'}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <p className="title2 text-white">오는 시간</p>
            <div
              className="w-full py-5 px-4 rounded-[12px] border-[1px] title2 cursor-pointer border-grey3 flex items-center gap-1"
              onClick={() => setOpenReturnTime(true)}
            >
              {returnTime ? <ClockSVG /> : <GreyClockSVG />}
              <p
                className={`body1 ${returnTime ? 'text-grey7' : 'text-grey3'}`}
              >
                {returnTime ? formatTime(returnTime) : '시간 선택'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 가는 날 날짜 선택 모달 */}
      {open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl p-6 w-[340px] shadow-lg flex flex-col items-center">
            <Calender />
            <div className="flex w-full gap-2 mt-4">
              <button
                className="flex-1 py-3 rounded-xl border border-grey3 text-grey7 font-semibold"
                onClick={() => setOpen(false)}
              >
                취소
              </button>
              <button
                className="flex-1 py-3 rounded-xl bg-primary_orange1 text-white font-semibold"
                onClick={() => {
                  setDepartureDate(selectedDate);
                  setOpen(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 가는 날 시간 선택 모달 */}
      {openTime && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl p-6 w-[340px] shadow-lg flex flex-col items-center">
            <div className="mb-2 text-center font-bold text-lg">
              탑승 시간 선택
            </div>
            <TimePickerCard onTimeSelect={(time) => setDepartureTime(time)} />
            <div className="flex w-full gap-2 mt-4">
              <button
                className="flex-1 py-3 rounded-xl border border-grey3 text-grey7 font-semibold"
                onClick={() => setOpenTime(false)}
              >
                취소
              </button>
              <button
                className="flex-1 py-3 rounded-xl bg-primary_orange1 text-white font-semibold"
                onClick={() => setOpenTime(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 오는 날 날짜 선택 모달 */}
      {openReturn && travelType === '왕복' && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl p-6 w-[340px] shadow-lg flex flex-col items-center">
            <Calender />
            <div className="flex w-full gap-2 mt-4">
              <button
                className="flex-1 py-3 rounded-xl border border-grey3 text-grey7 font-semibold"
                onClick={() => setOpenReturn(false)}
              >
                취소
              </button>
              <button
                className="flex-1 py-3 rounded-xl bg-primary_orange1 text-white font-semibold"
                onClick={() => {
                  setReturnDate(selectedDate);
                  setOpenReturn(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 오는 날 시간 선택 모달 */}
      {openReturnTime && travelType === '왕복' && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl p-6 w-[340px] shadow-lg flex flex-col items-center">
            <div className="mb-2 text-center font-bold text-lg">
              탑승 시간 선택
            </div>
            <TimePickerCard onTimeSelect={(time) => setReturnTime(time)} />
            <div className="flex w-full gap-2 mt-4">
              <button
                className="flex-1 py-3 rounded-xl border border-grey3 text-grey7 font-semibold"
                onClick={() => setOpenReturnTime(false)}
              >
                취소
              </button>
              <button
                className="flex-1 py-3 rounded-xl bg-primary_orange1 text-white font-semibold"
                onClick={() => setOpenReturnTime(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
