import dynamic from 'next/dynamic';

const MyComp = () => {
  const Editor = dynamic(() => import('../components/Editor'), { ssr: false });
  return <Editor />;
};

export default MyComp;
