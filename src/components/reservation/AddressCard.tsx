import InfoCard from '@components/all/InfoCard';

export default function AddressCard({ number = 2 }: { number?: number }) {
  return (
    <section
      className={`w-full flex flex-col p-5 border-b border-grey2 gap-6 ${
        number === 1 ? 'mt-[68px]' : 'mt-5'
      }`}
    >
      <InfoCard number={number} content="배송받을 주소를 입력해주세요." />
      <input
        className="w-full py-5 px-4 rounded-[12px] border-[1px] body1 grey7 cursor-pointer border-grey3 focus:border-primary_orange1"
        placeholder="주소를 입력해주세요."
      />
    </section>
  );
}
