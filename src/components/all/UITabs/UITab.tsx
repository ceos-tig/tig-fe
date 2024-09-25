'use client';
import useTab from '@store/tabNumberStore';
import { cn } from '@utils/cn';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import BallingSVG from '@public/svg/UITabs/fillballing.svg';
import BaseballSVG from '@public/svg/UITabs/fillbaseball.svg';
import FootballSVG from '@public/svg/UITabs/fillfootball.svg';
import GolfSVG from '@public/svg/UITabs/fillgolf.svg';
import PocketballSVG from '@public/svg/UITabs/fillpocketball.svg';
import SquashSVG from '@public/svg/UITabs/fillsquash.svg';
import TabletennisSVG from '@public/svg/UITabs/filltableTennis.svg';
import TennisSVG from '@public/svg/UITabs/filltennis.svg';
import AllSVG from '@public/svg/UITabs/fillAll.svg';
import UnfillAllSVG from '@public/svg/UITabs/unfillAll.svg';
import UnfillBallingSVG from '@public/svg/UITabs/unfillballing.svg';
import UnfillBaseballSVG from '@public/svg/UITabs/unfillbaseball.svg';
import UnfillFootballSVG from '@public/svg/UITabs/unfillfootball.svg';
import UnfillGolfSVG from '@public/svg/UITabs/unfillgolf.svg';
import UnfillPocketballSVG from '@public/svg/UITabs/unfillpocketball.svg';
import UnfillSquashSVG from '@public/svg/UITabs/unfillsquash.svg';
import UnfillTabletennisSVG from '@public/svg/UITabs/unfilltableTennis.svg';
import UnfillTennisSVG from '@public/svg/UITabs/unfilltennis.svg';

interface TabProps {
  defaultName: string;
  name: string;
  className?: string;
}

export default function UITab({ name, defaultName, className }: TabProps) {
  const currentTab = useTab((state) => state.selectedTab);
  const setCurrentTab = useTab((state) => state.setSelectedTab);

  useEffect(() => {
    setCurrentTab(defaultName);

    return () => {
      setCurrentTab(defaultName);
    };
  }, []);
  if (name === '전체') {
    return (
      <div className="w-[50px] h-[70px] flex flex-col gap-1 items-center" onClick={()=>{setCurrentTab(name)}}>
        {currentTab === name ? <AllSVG /> : <UnfillAllSVG />}
        <div
          className={cn('text-grey6', {
            title4: currentTab === name,
            caption2: currentTab !== name,
          })}
        >
          {name}
        </div>
      </div>
    );
  }
  if (name === '당구') {
    return (
      <div className="w-[50px] h-[70px] flex flex-col gap-1 items-center cursor-pointer" onClick={()=>{setCurrentTab(name)}}>
        {currentTab === name ? <PocketballSVG /> : <UnfillPocketballSVG />}
        <div
          className={cn('text-grey6', {
            title4: currentTab === name,
            caption2: currentTab !== name,
          })}
        >
          {name}
        </div>
      </div>
    );
  }
  if (name === '탁구') {
    return (
      <div className="w-[50px] h-[70px] flex flex-col gap-1 items-center cursor-pointer" onClick={()=>{setCurrentTab(name)}}>
        {currentTab === name ? <TabletennisSVG /> : <UnfillTabletennisSVG />}
        <div
          className={cn('text-grey6', {
            title4: currentTab === name,
            caption2: currentTab !== name,
          })}
        >
          {name}
        </div>
      </div>
    );
  }
  if (name === '테니스') {
    return (
      <div className="w-[50px] h-[70px] flex flex-col gap-1 items-center cursor-pointer" onClick={()=>{setCurrentTab(name)}}>
        {currentTab === name ? <TennisSVG /> : <UnfillTennisSVG />}
        <div
          className={cn('text-grey6', {
            title4: currentTab === name,
            caption2: currentTab !== name,
          })}
        >
          {name}
        </div>
      </div>
    );
  }
  if (name === '스크린골프') {
    return (
      <div className="w-[50px] h-[70px] flex flex-col gap-1 items-center cursor-pointer" onClick={()=>{setCurrentTab(name)}}>
        {currentTab === name ? <GolfSVG /> : <UnfillGolfSVG />}
        <div
          className={cn('text-grey6', {
            샤ㅅ: currentTab === name,
            caption2: currentTab !== name,
          })}
        >
          {'골프'}
        </div>
      </div>
    );
  }
  if (name === '축구') {
    return (
      <div className="w-[50px] h-[70px] flex flex-col gap-1 items-center cursor-pointer" onClick={()=>{setCurrentTab(name)}}>
        {currentTab === name ? <FootballSVG /> : <UnfillFootballSVG />}
        <div
          className={cn('text-grey6', {
            title4: currentTab === name,
            caption2: currentTab !== name,
          })}
        >
          {name}
        </div>
      </div>
    );
  }
  if (name === '야구') {
    return (
      <div className="w-[50px] h-[70px] flex flex-col gap-1 items-center cursor-pointer" onClick={()=>{setCurrentTab(name)}}>
        {currentTab === name ? <BaseballSVG /> : <UnfillBaseballSVG />}
        <div
          className={cn('text-grey6', {
            title4: currentTab === name,
            caption2: currentTab !== name,
          })}
        >
          {name}
        </div>
      </div>
    );
  }
  if (name === '볼링') {
    return (
      <div className="w-[50px] h-[70px] flex flex-col gap-1 items-center cursor-pointer" onClick={()=>{setCurrentTab(name)}}>
        {currentTab === name ? <BallingSVG /> : <UnfillBallingSVG />}
        <div
          className={cn('text-grey6', {
            title4: currentTab === name,
            caption2: currentTab !== name,
          })}
        >
          {name}
        </div>
      </div>
    );
  }
  if (name === '스쿼시') {
    return (
      <div className="w-[50px] h-[70px] flex flex-col gap-1 items-center cursor-pointer" onClick={()=>{setCurrentTab(name)}}>
        {currentTab === name ? <SquashSVG /> : <UnfillSquashSVG />}
        <div
          className={cn('text-grey6', {
            title4: currentTab === name,
            caption2: currentTab !== name,
          })}
        >
          {name}
        </div>
      </div>
    );
  }
  return null;
}
