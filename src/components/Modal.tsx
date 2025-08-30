
import Cancel from "../assets/Frame(3).svg?react";

//I created a reusable Modal component to display content in an overlay with a darkened background.
export interface ModalProps {
    isOpen: boolean | undefined;
    onClose: () => void;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    children,
    isOpen,
    onClose
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#121212] rounded-2xl relative w-[480px] max-h-[90vh] overflow-y-auto mx-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <button
                    // onClick={onClose}
                    className="absolute top-4 right-4 text-[#b3b4b3] hover:text-white transition-colors"
                >
                    {/* {<Cancel className="w-5 h-5" />} */}
                </button>
                {children}
            </div>
        </div>
    );
};
export default Modal;