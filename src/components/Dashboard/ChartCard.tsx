type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ChartCard({ title, children }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-[500px]">
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      {children}
    </div>
  );
}
