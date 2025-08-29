import type { User } from "../api/apiUserSlice";
import Avatar from "./Avatar";


interface CardProps {
    user: User;
    handleUserClick: (id: number) => void;
}

const Cards: React.FC<CardProps> = ({ user, handleUserClick }) => {
    return (
        <div
            key={user.id}
            className="
    bg-[#1E1E1E] 
    rounded-[12px] 
    border-t-2 border-black 
    [box-shadow:0px_4px_6px_-1px_#0000001A,0px_2px_4px_-2px_#0000001A]
    p-6 text-center 
    hover:bg-gray-700 
    cursor-pointer 
    relative 
    transition-colors
  "
            onClick={() => handleUserClick(user.id)}
        >
            <Avatar
                src={user.avatar || ""}
                alt={`${user.name} avatar`}
                className="relative mb-4.5 mx-auto w-[92px] h-[92px]"
            />
            <h3 className="text-white text-[15.3px] mb-1.5">{user.name}</h3>
            <h4 className="text-[#bbbbbb] text-[11.9px] leading-[20px]">
                {user.email}
            </h4>
        </div>
    );
};
export default Cards;
