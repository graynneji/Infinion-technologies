import { lazy, Suspense, useState } from 'react'
import React from 'react';
import { Plus, List } from 'lucide-react';
import DashboardIcon from "../assets/mage_dashboard.svg?react";
import SearchIcon from "../assets/iconoir_search.svg?react";
import Input from './Input';
import SideBar from './SideBar';
import { useGetUserByIdQuery, useGetUsersQuery, type User } from '../api/apiUserSlice';
import { useSearchWorker } from '../hooks/useSearchWorker';
import Spinner from './Spinner';
import AddUserModal from './AddNew';
import Button from './Button';
import { UserDetailsModal } from './UserDetails';
import Avatar from './Avatar';
import Profile from "../assets/f6a64218e22438ff1eedb61c4e3259ea8bc1f3b7.jpg"
import Bell from "../assets/Frame 1618868734.svg?react";
// import { FixedSizeGrid as Grid } from 'react-window';
const Cards = lazy(() => import('./Cards'));

const UserDirectory: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false)
    const { data: users, error, isLoading, isFetching, refetch } = useGetUsersQuery();
    const [selectedUserId, setSelectedUserId] = useState<number>();
    const { data: selectedUser, error: selectedUserError, isLoading: selectedLoading, isFetching: selectedFetching } = useGetUserByIdQuery(selectedUserId!, { skip: selectedUserId === undefined })
    const { results, search } = useSearchWorker(users)
    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        search(event.target.value);
    };

    const handleClose = () => {
        setIsModalOpen(false)
    }

    const handleAddNewUser = (): void => {
        setIsModalOpen(true)
    };

    const handleUserClick = (userId: number): void => {
        setSelectedUserId(userId);
        setIsUserDetailsOpen(true);
    };

    const handleNavigationClick = (label: string): void => {
        console.log('Navigation clicked:', label);
    };

    const renderLeftIcon = () => {
        return <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#838383]" />
    }

    const renderRightIcon = () => {
        return (
            <div className="absolute right-0 mr-4 gap-3.5 rounded-lg top-1/2 transform -translate-y-1/2 hidden md:flex">
                <Button className="h-[40px] w-[40px] rounded-lg border border-[#343434]" aria-label="List view">
                    <List className="w-6 h-6 text-[#343434] mx-auto" />
                </Button>
                <Button className="h-[40px] w-[40px] rounded-lg bg-[#343434]" aria-label="Grid view">
                    <DashboardIcon className="w-6 h-6 text-[#b3b4b3] mx-auto my-auto" />
                </Button>
            </div>
        )
    }

    return (
        <div className="flex relative w-full min-h-screen bg-[#121212] font-inter text-white">
            {/* Sidebar */}
            <SideBar handleNavigationClick={handleNavigationClick} />

            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <div className="mb-[35px] py-6 px-10 items-center justify-between sticky top-0 z-10 h-[92px] hidden md:flex">
                    <Input leftIcon={renderLeftIcon} />
                    <div className="flex items-center space-x-4">
                        <Bell className="w-10 h-10 text-gray-400 cursor-pointer rounded-[100px] bg-[#181818] hover:text-white" />
                        <Avatar src={Profile} alt="Profile Picture" className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white" />
                    </div>
                </div>

                {/* Content */}
                <div className="px-[27px]">
                    {/* Page Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-white mb-2">User directory</h1>
                            <p className="text-[#b3b4b3]">Find a list of users below</p>
                        </div>
                        <Button
                            className="bg-white hidden md:flex text-[#030500] px-3 py-2 rounded-xl mt-auto w-auto items-center justify-center h-[42px] space-x-2 font-medium text-[15px] transition-colors"
                            onClick={handleAddNewUser}
                            icon={() => <Plus className="w-4.5 h-4.5" />}
                        >

                            <span>Add new</span>
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8 rounded-xl flex h-[62px] items-center bg-[#1e1e1e] border border-[#181818]">

                        <Input placeholder="Search user by name" onChange={handleSearchChange} variant="searchTwo" rightIcon={renderRightIcon} leftIcon={renderLeftIcon} />

                    </div>
                    {/* User Grid */}
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(319px,1fr))] gap-x-5 gap-y-4">
                        {isLoading && <Spinner />}

                        {error && !isLoading && (
                            <div className="text-white mx-auto my-auto">Failed to load users</div>
                        )}
                        <Suspense fallback={<Spinner />}>
                            {results.map((user: User) => (
                                <Cards key={user.id} user={user} handleUserClick={handleUserClick} />
                            ))}
                        </Suspense>
                    </div>
                    <AddUserModal isOpen={isModalOpen} onClose={handleClose} />
                    {selectedUser && (
                        <UserDetailsModal
                            isOpen={isUserDetailsOpen}
                            onClose={() => {
                                setIsUserDetailsOpen(false);
                                setSelectedUserId(undefined);
                            }}
                            user={selectedUser}
                        />
                    )}
                </div>
            </div>
        </div>

    );
};

export default UserDirectory;