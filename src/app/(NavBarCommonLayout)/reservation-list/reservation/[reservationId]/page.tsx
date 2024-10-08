'use client';
import handleSendTigCancelFailToDiscord from '@apis/discord/sendBackendCancelFailMessageToDiscord';
import cancelPortOnePayment from '@apis/portone/cancelPayment';
import { useDeleteUserSpecificReservation } from '@apis/reservation-list/reservation/deleteUserSpecificReservation';
import Header from '@components/all/Header';
import Modal from '@components/all/Modal';
import TigLoadingPage from '@components/all/TigLoadingPage';
import HistoryDetail from '@components/reservation-list/reservation/HistoryDetail';
import useModal from '@store/modalStore';
import { useQueryClient } from '@tanstack/react-query';
import { set } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ReservationDetailProps } from 'types/reservation-list/reservation/ReservationDetailType';

export default function Page({
  params,
}: {
  params: {
    reservationId: string;
  };
}) {
  const [data, setData] = useState<ReservationDetailProps>({
    adultCount: 0,
    teenagerCount: 0,
    kidsCount: 0,
    date: '',
    startTime: '2024-01-01T00:00:00',
    endTime: '',
    gameCount: 0,
    price: 1000,
    status: 'TBC',
    clubId: '1',
    clubName: '',
    phoneNumber: '',
    clubAddress: '',
    reservationId: '1',
    userName: '',
    paymentId: '',
    provider: '',
    message: '',
    imageUrls: ['/png/dummyImage.png'],
    updateAt: '2024-01-01T00:00:00',
    feePrice: 0,
    couponDiscountPrice: 0,
  });
  const setIsModalOpen = useModal((state) => state.setSelectedIsModalOpen);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/reservation/${params.reservationId}`,
          { cache: 'no-store' }
        );
        const data = await response.json();
        setData(data.result);
      } catch (error) {
        console.error('Failed to fetch reservation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservation();

    return () => {
      setIsModalOpen(false);
    };
  }, []);

  const cancelReservationMutation = useDeleteUserSpecificReservation();

  const router = useRouter();

  const queryClient = useQueryClient();

  if (isLoading) {
    return <TigLoadingPage />;
  }

  return (
    <div className="flex flex-col h-full relative ">
      <Header buttonType="back" title="예약 상세" />

      <main className="mt-[68px] mb-[54px] w-full h-full flex justify-center overflow-y-scroll">
        <HistoryDetail
          {...data}
          feePrice={0} // 추후에 백엔드에서 보내줄 필요가 있음
          couponDiscountPrice={0} // 백엔드에서 보내줄 필요가 있음
        />
        <Modal
          size="lg"
          button1Content="이전으로"
          button2Content="취소하기"
          title="예약을 취소하시겠습니까?"
          subTitle="예약 취소 시 수수료가 발생할 수 있습니다"
          secondButtonFunc={async () => {
            const cancelPortOneResponse = await cancelPortOnePayment(
              data.paymentId as string,
              '고객에 의한 예약 취소입니다'
            );

            if (cancelPortOneResponse.status !== 'SUCCEEDED') {
              alert(
                '결제 취소 요청이 실패했습니다! TIG 팀에 문의주시면 감사하겠습니다'
              );
            } else {
              cancelReservationMutation.mutate(Number(data.reservationId), {
                onSuccess(successData, variables, context) {
                  // 성공적인 tig 예약 취소가 이루어짐.
                  queryClient.invalidateQueries({
                    queryKey: ['userReservationList'],
                  });
                  if (successData.resultCode === 200) {
                    router.replace('/');
                  } else {
                    // Discord로 기획 쪽에 알리는 로직
                    handleSendTigCancelFailToDiscord(
                      Number(data.reservationId) as number,
                      data.paymentId as string
                    );
                  }
                },
              });
            }
          }}
        />
      </main>
    </div>
  );
}
