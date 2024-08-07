import * as PortOne from '@portone/browser-sdk/v2';
import makePaymentId from '@utils/makePaymentId';

const handlePaycoEasyPay = async (
  memberId: number,
  currentDateString: string
) => {
  const response = await PortOne.requestPayment({
    storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID as string,
    channelKey: process.env.NEXT_PUBLIC_PORTONE_PAYCO_EASY_PAY_CHANNEL_KEY,
    paymentId: makePaymentId(memberId, currentDateString),
    orderName: '나이키 와플 트레이너 2 SD',
    totalAmount: 100,
    currency: 'CURRENCY_KRW',
    payMethod: 'CARD',
  });
};

export default handlePaycoEasyPay;
