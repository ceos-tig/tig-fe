'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function KakaoOuthCodeSendPage() {
  const router = useRouter();
  const data = useSearchParams();
  const authCode = data?.get('code');

  console.log(authCode);

  useEffect(() => {
    async function postAuthCodeToBackend() {
      const response = await fetch(
        'http://localhost:8080/login/oauth2/code/kakao',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authCode),
        }
      );
    }

    if (authCode) {
      postAuthCodeToBackend();
    }
  }, [authCode]);
  return <div>This is kakao login 리다이렉트 uri 페이지</div>;
}
