const Loading = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen animate-spin rounded-full w-16 border-t-4 border-blue-500 border-opacity-50">
        <div className="animate-spin rounded-full h-16 w-16 bg-blue-500 opacity-75">
          loading...
        </div>
      </div>
    </>
  );
};

export default Loading;
