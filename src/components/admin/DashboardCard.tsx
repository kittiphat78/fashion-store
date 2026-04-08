/**
 * DashboardCard Component
 * การ์ดแสดงสถิติสรุปในหน้า Admin Dashboard
 */

interface DashboardCardProps {
  icon: string;
  label: string;
  value: string;
  trend?: string;
}

export default function DashboardCard({
  icon,
  label,
  value,
  trend,
}: DashboardCardProps) {
  return (
    <div className="adm-card">
      <div className="adm-card-icon">{icon}</div>
      <div className="adm-card-body">
        <p className="adm-card-label">{label}</p>
        <h3 className="adm-card-value">{value}</h3>
        {trend && <p className="adm-card-trend">{trend}</p>}
      </div>
    </div>
  );
}
