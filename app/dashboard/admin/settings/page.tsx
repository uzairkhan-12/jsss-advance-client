import Analytics from '@/components/admin/settings/analytics';
import ManageUsers from '@/components/admin/settings/manage-users';

export default function SettingsPage() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-10">
        <ManageUsers />
        <div className="col-span-2">
          <Analytics />
        </div>
      </div>
    </div>
  );
}
