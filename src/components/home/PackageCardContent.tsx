import Footer from '@components/all/Footer/Footer';
import { Package } from 'types/response/response';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from 'date-fns';
import { cn } from '@utils/cn';
import { packageArrayMapEngToKor } from '@constant/constant';
import { usePackageCards } from '@hooks/home/usePackageCards';

// 패키지용 ResultCard 컴포넌트
const PackageResultCard = ({ packageItem }: { packageItem: Package }) => {
  return (
    <Link
      href={`/detail-page/${packageItem.id}?date=${formatDate(
        new Date(),
        "yyyy-MM-dd'T'HH:mm:ss"
      )}&type=package&category=${packageItem.category}`}
      className={cn(
        'w-full h-[168px] flex gap-4 p-5 border-b border-grey2 max-w-[480px] min-w-[360px] cursor-pointer bg-white'
      )}
    >
      <div className="relative shrink-0">
        <div className="relative w-[128px] h-[128px] rounded-[10px] overflow-hidden">
          <Image
            src={
              packageItem.imageUrls && packageItem.imageUrls.length > 0
                ? packageItem.imageUrls[0]
                : '/png/dummyImage.png'
            }
            alt={packageItem.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="title3 text-grey8 truncate">{packageItem.name}</h3>
          <span className="body4 text-grey5 shrink-0">
            {packageArrayMapEngToKor[packageItem.category]}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="body4 text-grey6">★</span>
          <span className="body4 text-grey6">{packageItem.avgRating}</span>
          <span className="body4 text-grey5">({packageItem.ratingCount})</span>
        </div>
        <p className="body4 text-grey6 truncate">{packageItem.address}</p>
        {packageItem.prices && packageItem.prices.length > 0 && (
          <p className="title3 text-grey8">
            {Math.min(
              ...(packageItem.prices as any[]).map((obj: any) => obj.price)
            ).toLocaleString()}
            원부터
          </p>
        )}
      </div>
    </Link>
  );
};

export default function PackageCardContent({ isLogin }: { isLogin: boolean }) {
  const { renderingPackageCards } = usePackageCards(isLogin);

  return (
    <>
      <div className="w-full">
        {renderingPackageCards.map((packageItem: Package) => (
          <PackageResultCard key={packageItem.id} packageItem={packageItem} />
        ))}
      </div>
      <Footer />
    </>
  );
}
