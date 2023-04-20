import React from 'react';
import Landing from '../../components/Policies/Landing';
import Content from '../../components/Policies/Content';
import Footer from '../../components/onboarding/Footer';
import Intersection from '../../components/Policies/Intersection';

const PrivacyPolicy = () => {
  return (
    <div className="relative overflow-hidden">
      <Landing />
      <Intersection/>
      <Content />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
