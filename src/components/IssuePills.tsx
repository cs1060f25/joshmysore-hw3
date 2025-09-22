import { Badge } from './ui/badge';

interface IssuePillsProps {
  issues: string[];
  className?: string;
}

const issueLabels: Record<string, string> = {
  climate: 'Climate',
  healthcare: 'Healthcare',
  immigration: 'Immigration',
  economy: 'Economy',
  crime: 'Crime',
  education: 'Education',
  labor: 'Labor',
  renewables: 'Renewables',
  'small-business': 'Small Business',
  housing: 'Housing',
  manufacturing: 'Manufacturing',
  tourism: 'Tourism'
};

export default function IssuePills({ issues, className = '' }: IssuePillsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {issues.map((issue) => (
        <Badge key={issue} variant="secondary" className="text-xs">
          {issueLabels[issue] || issue}
        </Badge>
      ))}
    </div>
  );
}
