'use client';
import BallingSVG from '@public/svg/homeUI/balling.svg';
import BaseballSVG from '@public/svg/homeUI/baseball.svg';
import FootballSVG from '@public/svg/homeUI/football.svg';
import GolfSVG from '@public/svg/homeUI/golf.svg';
import PocketballSVG from '@public/svg/homeUI/pocketball.svg';
import SquashSVG from '@public/svg/homeUI/squash.svg';
import TabletennisSVG from '@public/svg/homeUI/tableTennis.svg';
import TennisSVG from '@public/svg/homeUI/tennis.svg';
import Link from 'next/link';

interface UICardListProps {
  type:
    | 'POCKET_BALL'
    | 'BALLING'
    | 'SCREEN_GOLF'
    | 'TABLE_TENNIS'
    | 'TENNIS'
    | 'FOOTBALL'
    | 'BASEBALL'
    | 'SQUASH';
}

export default function UICardList({ type }: UICardListProps) {
  if (type === 'POCKET_BALL') {
    return (
      <Link
        className="flex items-center gap-1 flex-col body4 text-grey6 cursor-pointer"
        href={`/home/${type}`}
      >
        <PocketballSVG />
        <div>포켓볼</div>
      </Link>
    );
  }
  if (type === 'BALLING') {
    return (
      <Link
        className="flex items-center gap-1 flex-col body4 text-grey6 cursor-pointer"
        href={`/home/${type}`}
      >
        <BallingSVG />
        <div>볼링</div>
      </Link>
    );
  }
  if (type === 'SCREEN_GOLF') {
    return (
      <Link
        className="flex items-center gap-1 flex-col body4 text-grey6 cursor-pointer"
        href={`/home/${type}`}
      >
        <GolfSVG />
        <div>스크린골프</div>
      </Link>
    );
  }
  if (type === 'TABLE_TENNIS') {
    return (
      <Link
        className="flex items-center gap-1 flex-col body4 text-grey6 cursor-pointer"
        href={`/home/${type}`}
      >
        <TabletennisSVG />
        <div>탁구</div>
      </Link>
    );
  }
  if (type === 'TENNIS') {
    return (
      <Link
        className="flex items-center gap-1 flex-col body4 text-grey6 cursor-pointer"
        href={`/home/${type}`}
      >
        <TennisSVG />
        <div>테니스</div>
      </Link>
    );
  }
  if (type === 'FOOTBALL') {
    return (
      <Link
        className="flex items-center gap-1 flex-col body4 text-grey6 cursor-pointer"
        href={`/home/${type}`}
      >
        <FootballSVG />
        <div>축구</div>
      </Link>
    );
  }
  if (type === 'BASEBALL') {
    return (
      <Link
        className="flex items-center gap-1 flex-col body4 text-grey6 cursor-pointer"
        href={`/home/${type}`}
      >
        <BaseballSVG />
        <div>야구</div>
      </Link>
    );
  }
  if (type === 'SQUASH') {
    return (
      <Link
        className="flex items-center gap-1 flex-col body4 text-grey6 cursor-pointer"
        href={`/home/${type}`}
      >
        <SquashSVG />
        <div>스쿼시</div>
      </Link>
    );
  }
  return null;
}