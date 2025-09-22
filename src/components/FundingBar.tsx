interface FundingBarProps {
  us: number;
  them: number;
}

export default function FundingBar({ us, them }: FundingBarProps) {
  const maxFunding = Math.max(us, them);
  const usPercentage = (us / maxFunding) * 100;
  const themPercentage = (them / maxFunding) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-600">
        <span>Our Candidate</span>
        <span>Opponent</span>
      </div>
      <div className="flex h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 transition-all duration-500"
          style={{ width: `${usPercentage}%` }}
        />
        <div
          className="bg-red-600 transition-all duration-500"
          style={{ width: `${themPercentage}%` }}
        />
      </div>
    </div>
  );
}
