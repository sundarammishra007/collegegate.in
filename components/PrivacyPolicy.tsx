import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-black mb-8 text-slate-900">Privacy Policy</h1>
        
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Welcome to CollegeGate. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at hello@collegegate.in.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when registering at the Services, expressing an interest in obtaining information about us or our products and services, when participating in activities on the Services or otherwise contacting us.
          </p>
          <p>
            The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use. The personal information we collect can include the following:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and Contact Data. We collect your first and last name, email address, postal address, phone number, and other similar contact data.</li>
            <li>Credentials. We collect passwords, password hints, and similar security information used for authentication and account access.</li>
            <li>Profile Data. We collect your date of birth, hobbies, dreams/goals, projects, and other information to personalize your experience.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To facilitate account creation and logon process.</li>
            <li>To send you marketing and promotional communications.</li>
            <li>To fulfill and manage your requests.</li>
            <li>To deliver targeted advertising to you.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We only share and disclose your information in the following situations:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Compliance with Laws.</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
            <li><strong>Vital Interests and Legal Rights.</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
            <li><strong>Vendors, Consultants and Other Third-Party Service Providers.</strong> We may share your data with third party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Contact Us</h2>
          <p>
            If you have questions or comments about this policy, you may email us at hello@collegegate.in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
