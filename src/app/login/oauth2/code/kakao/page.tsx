'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

const OAuth2Callback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();

  useEffect(() => {
    async function postCode() {
      const response = await fetch(
        'http://localhost:8080/login/oauth2/code/kakao',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(code),
        }
      ).then(
        (response)=>{
          if (response.ok) {
            const res = response.json();
            localStorage.setItem('accessToken', res);
            router.push('/');
          } else {
            console.error('Fetch failed:', response.statusText);
          }
        }
      )
    }
    postCode();
  }, [code]);

  return (
    <div>
      <h1>OAuth2 Callback</h1>
      {code}
    </div>
  );
};

export default OAuth2Callback;