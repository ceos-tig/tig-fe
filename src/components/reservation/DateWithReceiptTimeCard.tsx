import InfoCard from '@components/all/InfoCard';
import DateTimePicker from './DateTimePicker';
import DateTimePickerModal from './DateTimePickerModal';
import { useState } from 'react';
import { formatDateKor, formatTime } from '@utils/formatDate';
import { useSelectedDate } from '@store/selectedDateStore';

export default function DateWithReceiptTimeCard() {
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [receiptDate, setReceiptDate] = useState<Date | null>(null);
  const [receiptTime, setReceiptTime] = useState<string>('');

  const selectedDateStr = useSelectedDate((state) => state.selectedDate);
  const selectedDate = selectedDateStr ? new Date(selectedDateStr) : null;

  return (
    <section className="w-full flex flex-col p-5 mt-[68px] border-b border-grey2">
      <InfoCard number={1} content="날짜와 수령 시간을 입력해주세요." />
      <DateTimePicker
        label="수령"
        date={receiptDate}
        time={receiptTime}
        onDateClick={() => setOpen(true)}
        onTimeClick={() => setOpenTime(true)}
        formatDate={formatDateKor}
        formatTime={formatTime}
      />

      <DateTimePickerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setReceiptDate(selectedDate);
          setOpen(false);
        }}
        type="date"
      />

      <DateTimePickerModal
        isOpen={openTime}
        onClose={() => setOpenTime(false)}
        onConfirm={() => setOpenTime(false)}
        type="time"
        onTimeSelect={(time) => setReceiptTime(time)}
      />
    </section>
  );
}
