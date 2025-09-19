import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function RouteChangeLoader() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500); // simulate load
        return () => clearTimeout(timer);
    }, [location]);

    return (
        loading && (
            <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
                <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        )
    );
}
export default RouteChangeLoader

