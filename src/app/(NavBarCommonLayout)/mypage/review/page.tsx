import MypageFooter from '@components/all/Footer/MypageFooter';
import Header from '@components/all/Header';
import NonLoginIconSVG from '@public/svg/nonLogin/nonLoginIcon.svg';

export default function Page() {
  return (
    <div className="bg-grey1 w-full h-[calc(100%-180px)] flex flex-col items-center">
      <Header buttonType="back" title="쿠폰" bgColor="grey" isCenter />
      <p className="body2 text-grey7 px-5 py-[10px] mt-[68px] w-full mb-[40px]">
        작성한 리뷰 <span className="text-primary_orange1 body2">0</span>개
      </p>
      <NonLoginIconSVG />
      <p className="title2 text-grey4 pt-5">아직 작성한 리뷰가 없어요</p>
      <MypageFooter />
    </div>
  );
}
