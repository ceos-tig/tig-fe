export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers';
import ReservationListPage from './ReservationListPage';
import NonLoginReservationList from '@components/reservation-list/NonLoginReservationList';
import { getUserResListFetch } from '@apis/reservation-list/getUserResListFetch';

export default async function Page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  if (!accessToken) {
    return <NonLoginReservationList />;
  }

  // 서버 사이드에서 직접 데이터를 가져옴
  const data = await getUserResListFetch();
  const reservationList = data.result;
  return (
    <div className="w-full h-full flex flex-col">
      <ReservationListPage reservationList={reservationList} />
    </div>
  );
}
