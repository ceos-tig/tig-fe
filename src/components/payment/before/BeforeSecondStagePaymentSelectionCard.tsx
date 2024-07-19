import TossLogoSVG from '@public/svg/payment/before/tossLogo.svg';
import NaverPaymentLogoSVG from '@public/svg/payment/before/naverPaymentLogo.svg';
import KakaoPaymentLogoSVG from '@public/svg/payment/before/kakaoPaymentLogo.svg';
import { usePaymentSecondStage } from '@store/paymentInfoStore';
import { cn } from '@utils/cn';

type paymentMethodString =
  | 'naverPayment'
  | 'kakaoPayment'
  | 'tossAndCardPayment';

interface BeforeSecondStagePaymentSelectionCardProps {
  paymentMethod: paymentMethodString | null;
}

export default function BeforeSecondStagePaymentSelectionCard({
  paymentMethod,
}: BeforeSecondStagePaymentSelectionCardProps) {
  const secondStageInfoObject = usePaymentSecondStage(
    (state) => state.secondStageInfoObject
  );
  const setSecondStageInfoObject = usePaymentSecondStage(
    (state) => state.setSecondStageInfoObject
  );

  const paymentArray: paymentMethodString[] = [
    'tossAndCardPayment',
    'naverPayment',
    'kakaoPayment',
  ];

  const handleClickPayment = (
    incomingPaymentMethod:
      | 'naverPayment'
      | 'kakaoPayment'
      | 'tossAndCardPayment'
  ): void => {
    setSecondStageInfoObject({
      ...secondStageInfoObject,
      paymentMethod: incomingPaymentMethod,
    });
  };

  return (
    <div className="w-full h-fit flex flex-col gap-y-5 items-center bg-white rounded-[10px] py-5">
      <div className="w-sevenEightWidth flex justify-start items-center">
        <span className="title3 text-grey7">결제수단</span>
      </div>
      <div className="w-sevenEightWidth border-b-[1px] border-grey2" />
      <section className="w-sevenEightWidth flex flex-col gap-y-[10px]">
        {paymentArray.map((paymentMethod) => {
          return (
            <div
              className={cn(
                'flex items-center py-5 hover:cursor-pointer rounded-[10px]',
                {
                  'shadow-writingReviewInput':
                    secondStageInfoObject.paymentMethod !== paymentMethod,
                  'shadow-paymentSelection bg-grey1':
                    secondStageInfoObject.paymentMethod === paymentMethod,
                }
              )}
              key={paymentMethod}
              onClick={() => handleClickPayment(paymentMethod)}
            >
              <div className="w-full flex gap-x-[10px] justify-start items-center pl-5">
                <div className="w-[50px]">
                  {paymentMethod === 'tossAndCardPayment' ? (
                    <TossLogoSVG />
                  ) : paymentMethod === 'naverPayment' ? (
                    <NaverPaymentLogoSVG />
                  ) : (
                    <KakaoPaymentLogoSVG />
                  )}
                </div>
                <div className="body4 text-grey7">
                  {paymentMethod === 'tossAndCardPayment'
                    ? '토스 및 카드 결제'
                    : paymentMethod === 'naverPayment'
                    ? '네이버페이'
                    : '카카오페이'}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
