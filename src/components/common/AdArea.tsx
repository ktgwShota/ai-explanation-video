export default function AdArea({ width, height }: { width: any; height: any }) {
  return (
    <div
      style={{ width: width, height: height }}
      className="bg-blue-100 flex justify-center items-center"
    >
      広告表示位置
    </div>
  );
}
