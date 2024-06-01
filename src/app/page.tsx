'use client'

import Link from "next/link";

export default function Home() {
  const HandleClick = () => {}


  return <div className="w-full h-full flex items-center justify-center">
    <Link href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=772ee8988ee944d126d126ee9b3ccab2&redirect_uri=http://localhost:3000/login/oauth2/code/kakao">
      <button className="bg-[#FEE500] w-40 h-20 rounded-lg text-2xl hover:bg-[#fee500ba]" onClick={HandleClick}>로그인</button>
    </Link>
  </div>;
}
