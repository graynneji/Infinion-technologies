import { lazy, Suspense } from 'react'

import './App.css'


import React from 'react';
import { Plus, List, Bell } from 'lucide-react';
import DashboardIcon from "./assets/mage_dashboard.svg?react";
import SearchIcon from "./assets/iconoir_search.svg?react";
import SearchInput from './SearchInput';
import SideBar from './SideBar';
import { useGetUsersQuery, type User } from '../api/apiUserSlice';
import { useSearchWorker } from '../hooks/useSearchWorker';
import Spinner from './Spinner';
const Cards = lazy(() => import('./Cards'));

const UserDirectory: React.FC = () => {

    const { data: users, error, isLoading, isFetching, refetch } = useGetUsersQuery();
    console.log('Users data:', users, error, isLoading, isFetching);
    const { results, search } = useSearchWorker(users)
    // const [createPost, { isLoading: isPosting }] = useCreatePostMutation();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        search(event.target.value);
    };

    const handleAddNewUser = (): void => {
        // Handle adding new user
        console.log('Add new user clicked');
    };

    const handleUserClick = (userId: number): void => {
        // Handle user card click
        console.log('User clicked:', userId);
    };

    const handleNavigationClick = (label: string): void => {
        console.log('Navigation clicked:', label);
    };

    const renderLeftIcon = () => {
        return <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#838383]" />
    }

    const renderRightIcon = () => {
        return (
            <div className="absolute right-0 mr-4 flex gap-3.5 rounded-lg top-1/2 transform -translate-y-1/2">
                <button className="h-[40px] w-[40px] rounded-lg border border-[#343434]" aria-label="List view">
                    <List className="w-6 h-6 text-[#343434] mx-auto" />
                </button>
                <button className="h-[40px] w-[40px] rounded-lg bg-[#343434]" aria-label="Grid view">
                    <DashboardIcon className="w-6 h-6 text-[#b3b4b3] mx-auto my-auto" />
                </button>
            </div>
        )
    }

    return (
        <div className="flex w-full min-h-screen bg-[#121212] font-inter text-white">
            {/* Sidebar */}
            <SideBar handleNavigationClick={handleNavigationClick} />

            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <div className="mb-[35px] py-6 px-10 flex items-center justify-between sticky top-0 z-10 h-[92px]">
                    <SearchInput leftIcon={renderLeftIcon} />
                    <div className="flex items-center space-x-4 ml-8">
                        <Bell className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
                        <div className="w-8 h-8 bg-gray-600 rounded-full cursor-pointer"></div>
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
                        <button
                            className="bg-white text-[#030500] px-3 py-2 rounded-xl mt-auto w-auto flex items-center justify-center h-[42px] space-x-2 font-medium text-[15px] transition-colors"
                            onClick={handleAddNewUser}
                        >
                            <Plus className="w-4.5 h-4.5" />
                            <span>Add new</span>
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8 rounded-xl flex h-[62px] items-center bg-[#1e1e1e] border border-[#181818]">

                        <SearchInput placeholder="Search user by name" onChange={handleSearchChange} variant="searchTwo" rightIcon={renderRightIcon} leftIcon={renderLeftIcon} />

                    </div>
                    {/* User Grid */}
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(319px,1fr))] gap-x-5 gap-y-4">
                        {isLoading && <Spinner />}

                        {error && !isLoading && (
                            <div className="text-white mx-auto my-auto">Failed to load users</div>
                        )}
                        <Suspense fallback={<Spinner />}>
                            {results.map((user: User) => (
                                <Cards user={user} handleUserClick={handleUserClick} />
                            ))}
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDirectory;