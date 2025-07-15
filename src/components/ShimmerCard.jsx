const ShimmerCard = () => {
    return (
        <>
            {[1, 2, 3].map((_, i) => (
                <div key={i} className="animate-pulse flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                    <div className="bg-gray-400 rounded-full w-20 h-20"></div>
                    <div className="flex-1 space-y-4 px-4 py-2">
                        <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-400 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-400 rounded w-2/3"></div>
                    </div>
                    <div className="h-10 w-20 bg-gray-400 rounded-lg"></div>
                </div>
            ))}
        </>
    );
};

export default ShimmerCard;
