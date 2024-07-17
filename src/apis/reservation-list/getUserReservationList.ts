import { useQuery } from '@tanstack/react-query';
import { ReservationItemProps } from 'types/reservation-list/ReservationListPageTypes';
import { instance } from '@apis/instance';

export interface userReservationListResponse {
  result: ReservationItemProps[];
  resultCode: number;
  resultMsg: string;
}

export const getUserReservationList =
  async (): Promise<userReservationListResponse> => {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/reservation/all`,
    //   {
    //     credentials: 'include',
    //   }
    // );

    // if (!response.ok) {
    //   throw new Error('Failed to fetch user reservation list data!');
    // }

    // const data: userReservationListResponse = await response.json();

    // return data;
    return instance.get('/api/v1/resevation/all');
  };

export const useGetReservationList = () => {
  return useQuery({
    queryKey: ['userReservationList'],
    queryFn: getUserReservationList,
  });
};
