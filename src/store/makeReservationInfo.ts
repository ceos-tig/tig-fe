import { formatDate } from 'date-fns';
import { create } from 'zustand';

interface MakeReservationInfoProps {
  date: string;
  startTime: string;
  adultCount: number;
  teenagerCount: number;
  kidsCount: number;
  request: string;
  clubId: string | null; // 실제로는 숫자지만 문자열로 쿼리스트링으로 넘김
}
interface MakeGameReservationInfoProps extends MakeReservationInfoProps {
  gameCount: number;
}
interface MakeTimeReservationInfoProps extends MakeReservationInfoProps {
  endTime: string;
}

interface GameReservationStore {
  gameReservationInfo: MakeGameReservationInfoProps;
  setGameReservationInfo: (info: MakeGameReservationInfoProps) => void;
}

interface TimeReservationStore {
  timeReservationInfo: MakeTimeReservationInfoProps;
  setTimeReservationInfo: (info: MakeTimeReservationInfoProps) => void;
}

export const useGameReservationStore = create<GameReservationStore>((set) => ({
  gameReservationInfo: {
    date: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    startTime: '',
    adultCount: 0,
    teenagerCount: 0,
    kidsCount: 0,
    request: '',
    gameCount: 0,
    clubId: null,
  },
  setGameReservationInfo: (info) => set({ gameReservationInfo: info }),
}));

export const useTimeReservationStore = create<TimeReservationStore>((set) => ({
  timeReservationInfo: {
    date: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    startTime: '',
    endTime: '',
    adultCount: 0,
    teenagerCount: 0,
    kidsCount: 0,
    request: '',
    clubId: null,
  },
  setTimeReservationInfo: (info) => set({ timeReservationInfo: info }),
}));
