
function LoadingDots() {
    return (
        <div className="fixed bottom-5 right-5">
        <div className="w-32 h-32 flex justify-center items-center">
          <span className="loading loading-dots loading-md text-info scale-150"></span>
        </div>
      </div>
    );
  }
  
  export default LoadingDots;