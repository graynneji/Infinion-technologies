import Modal, { type ModalProps } from "./Modal";
import Phone from '../assets/Frame.svg?react';
import MapPin from '../assets/Frame(1).svg?react';
import Calendar from '../assets/Frame(2).svg?react';
import type { User } from "../api/apiUserSlice";
import Cancel from "../assets/Frame(3).svg?react";
import Avatar from "./Avatar";
import { formatDateOfBirth, formatPhoneNumber } from "../utils";
import Spinner from "./Spinner";
import Button from "./Button";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

//handled all individual user details in a modal popup
export interface UserDetailsModalProps extends ModalProps {
    user?: User;
    selectedUserError?: FetchBaseQueryError | SerializedError | undefined;
    selectedLoading?: boolean;
    selectedFetching?: boolean;
    byIdRefetch?: () => void;
}

const UserDetails: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, user, selectedFetching, selectedLoading, selectedUserError, byIdRefetch }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {/* Loading */}
            {(selectedLoading || selectedFetching) && (
                <div className="flex items-center justify-center h-64 w-80">
                    <Spinner />
                </div>
            )}

            {/* Error */}
            {selectedUserError && !selectedLoading && !selectedFetching && (
                <div className="flex flex-col items-center justify-center h-full space-y-4 p-6">
                    <h1 className="text-white text-lg font-bold">Failed to load user</h1>
                    <Button onClick={byIdRefetch} className="bg-white text-black rounded-lg py-2 px-3 mt-2">
                        Retry
                    </Button>
                </div>
            )}

            {/* User details */}
            {!selectedUserError && !selectedLoading && !selectedFetching && user && (
                <div className="p-6">
                    <div className="mb-6 flex justify-between items-center">

                        <h2 className="text-white text-lg font-bold text-[17px] leading-[28px]">User Details</h2>
                        <Cancel className="w-5 h-5" onClick={onClose} />
                    </div>

                    <div className="mb-8">
                        {user.avatar ? (
                            <Avatar src={user.avatar} alt={user.name} className="w-20 h-20 bg-gray-600 rounded-full mx-auto mb-5.25 overflow-hidden" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="bg-gradient-to-r from-[#3B82F6] to-[#9333EA] text-white px-3 py-1 text-sm font-medium w-max mx-auto mb-1">
                            {user.name}
                        </div>

                        <div className="text-[#bbbbbb] leading-[24px] text-[13.6px] text-center">
                            {user.email}
                        </div>
                    </div>

                    <div className="space-y-6 text-left">
                        <div className="flex items-start space-x-3">
                            <Phone className="w-5 h-5 text-[#3B82F6]" />
                            <div>
                                <div className="text-[#9CA3AF] text-[11.9px] leading-[20px]">Phone</div>
                                <div className="text-white text-[13.6px] leading-[24px]">
                                    {formatPhoneNumber(user.phone) || '+1 (555) 765-4321'}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-purple-500" />
                            <div>
                                <div className="text-[#9CA3AF] text-[11.9px] leading-[20px]">Location</div>
                                <div className="text-white text-[13.6px] leading-[24px]">{user.location}</div>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <Calendar className="w-5 h-5 text-purple-500" />
                            <div>
                                <div className="text-[#b3b4b3] text-xs">DOB</div>
                                <div className="text-white text-sm">{formatDateOfBirth(user.dob)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};
export default UserDetails;