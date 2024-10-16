import { redirect } from 'next/navigation';

function SettingsPage() {
  return redirect(`settings/integrations`);
}

export default SettingsPage;
