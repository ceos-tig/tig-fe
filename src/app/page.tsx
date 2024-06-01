import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <div className="border border-solid border-slate-950 w-fit">
        <Link href="/login">Go to Login Page. Click me</Link>
      </div>
    </div>
  );
}
