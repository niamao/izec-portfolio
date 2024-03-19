import { AiOutlineLoading } from "react-icons/ai";

export function Loader({ textClassNames = "" }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
            <div className="flex flex-col items-center gap-5">
                <div className="animate-spin">
                    <AiOutlineLoading size={30} />
                </div>
                <p className={textClassNames}>Loading...</p>
            </div>
        </div>
    );
}