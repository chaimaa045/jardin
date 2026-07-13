import { redirect } from 'next/navigation';

// /admin → redirige automatiquement vers /admin/dashboard
export default function AdminRoot() {
  redirect('/admin/dashboard');
}
