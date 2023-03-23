//  create an about us page
import Grid from './Grid';

export default function WhyUs() {
  return (
    <>
      <div className="w-full flex flex-col xl:pt-6 xl:pl-20 xl:pr-10 xl:pb-20 overflow-x-hidden">
        <div className="font-black text-4xl pl-10 text-accent-primary">
          Why sell on <span className="text-brand-600">Hajurbuwa</span>?
        </div>
        <Grid />
      </div>
    </>
  );
}
