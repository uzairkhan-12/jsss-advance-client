import PersonalizeCard from '@/components/user/content/personalize/personalizeCard';
import ProductServicesMain from '@/components/user/content/productServices/productServicesMain';
import ReferralCard from '@/components/user/content/referral/referralCard';
import CardLayout from '@/components/shared/layouts/cardLayout';

export default function ContentPage() {
  return (
    <>
      <CardLayout>
        <div className="grid gap-y-10 gap-x-10 grid-cols-1 xl:grid-cols-2">
          <div className="grid gap-10 grid-cols-1 lg:grid-cols-2">
            <ReferralCard />
            <PersonalizeCard />
          </div>
          <ProductServicesMain />
        </div>
      </CardLayout>
    </>
  );
}
