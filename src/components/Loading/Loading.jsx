import useSettings from "../../hooks/useSettings";

const Loading = () => {
  const { primaryColor } = useSettings();
  return (
    <div className="py-36 px-2 flex justify-center items-center text-lg">
      <div
        className={`animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent ${primaryColor} rounded-full`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default Loading;
