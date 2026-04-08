/**
 * SectionTitle Component
 * Reusable heading with optional subtitle and decorative line
 */

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
}: SectionTitleProps) {
  return (
    <div className={`section-title ${centered ? 'centered' : ''}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <div className="section-title-line" />
    </div>
  );
}
