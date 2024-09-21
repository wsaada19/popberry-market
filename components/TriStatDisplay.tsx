type TriStatDisplayProps = {
  value: string;
  type: string;
  rank: string;
};

export const TriStatDisplay = ({ value, type, rank }: TriStatDisplayProps) => {
  return (
    <span>
      <div className="text-center text-xs">{type}</div>
      <div className="text-xl text-center md:text-xl font-bold relative">{value}</div>
      <div className="text-center text-xs">{rank}th</div>
    </span>
  );
};
