import dynamic from 'next/dynamic';

const MyComp = () => {
  const Editor = dynamic(() => import('../components/Editor'), { ssr: false });

  return (
    <div className="w-1/2 h-56">
      <Editor />
    </div>
  );
};

export default MyComp;
