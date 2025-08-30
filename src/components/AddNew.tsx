import { useState } from "react";
import Input from "./Input";
import Modal, { type ModalProps } from "./Modal";
import { useCreateUserMutation } from "../api/apiUserSlice";
import Button from "./Button";
import Cancel from "../assets/Frame(3).svg?react";

function isFetchBaseQueryError(error: unknown): error is import('@reduxjs/toolkit/query').FetchBaseQueryError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        'data' in error
    );
}


const AddUserModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        dateOfBirth: '',
    })
    const isFormValid = formData.name && formData.location && formData.dateOfBirth;
    const [createPost, { isLoading: isPosting, error }] = useCreateUserMutation();
    const [errorAddUser, setErrorAddUser] = useState<string | unknown | undefined>("")
    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrorAddUser("")
    };

    const handleSaveNewUser = async () => {
        const userData = {
            name: formData.name,
            location: formData.location,
            dob: formData.dateOfBirth,
        }
        try {
            await createPost(userData).unwrap();
            setFormData({ name: '', location: '', dateOfBirth: '' });
            onClose();
        } catch (err) {
            //using type guard to check if the error is of type FetchBaseQueryError and display in the UI
            if (isFetchBaseQueryError(err)) {
                const fetchError = err as import('@reduxjs/toolkit/query').FetchBaseQueryError;
                if (typeof fetchError.data === 'string') {
                    return setErrorAddUser(fetchError.data);
                }
                return setErrorAddUser(JSON.stringify(fetchError.data));
            } else if (typeof err === 'object' && err !== null && 'message' in err) {
                return setErrorAddUser(String((err as { message?: unknown }).message));
            }
            return setErrorAddUser('Unknown error');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6">
                <div className="flex justify-between items-center mb-[45px]">
                    <h2 className="text-white text-[17px] leading-[28px] font-bold ">Enter User Details</h2>
                    <Cancel className="w-5 h-5" onClick={onClose} />
                </div>
                {error && <span className="text-red-500 text-sm mb-1 flex justify-center">
                    {String(errorAddUser)}
                </span>}
                <div className="space-y-4">

                    <Input
                        value={formData.name}
                        label={() => <label className="block text-[#ffffff] text-sm mb-1.25">Name</label>}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="E.g John"
                        className="w-full bg-[#1e1e1e] border border-[#343434] font-nunito rounded-lg px-4 py-3 text-white placeholder:text-[#6c6c6c] placeholder:text-[14px] focus:outline-none focus:border-[#555]"
                    />

                    <Input
                        value={formData.location}
                        label={() => <label className="block text-[#ffffff] text-sm mb-1.25">Location</label>}
                        onChange={(e) => handleChange("location", e.target.value)}
                        placeholder="E.g Boston, USA"
                        className="w-full bg-[#1e1e1e] border border-[#343434] font-nunito rounded-lg px-4 py-3 text-white placeholder:text-[#6c6c6c] placeholder:text-[14px] focus:outline-none focus:border-[#555]"
                    />

                    <Input
                        value={formData.dateOfBirth}
                        label={() => <label className="block text-[#ffffff] text-sm mb-1.25">Date of Birth</label>}
                        onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                        placeholder="E.g 26/04/1945"
                        className="w-full bg-[#1e1e1e] border border-[#343434] font-nunito rounded-lg px-4 py-3 text-white placeholder:text-[#6c6c6c] placeholder:text-[14px] focus:outline-none focus:border-[#555]"
                    />

                </div>
                <Button
                    onClick={handleSaveNewUser}
                    disabled={!isFormValid || isPosting}
                    className="w-full bg-white text-black rounded-lg py-2 px-3 mt-10 font-medium disabled:bg-[#3C3C3C] hover:bg-gray-100 transition-colors"
                >
                    Save
                </Button>
            </div>
        </Modal>
    );
};

export default AddUserModal;