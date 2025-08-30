import { lazy, Suspense, useRef, useState, type JSX } from 'react'
import React from 'react';
import DashboardIcon from "../assets/mage_dashboard.svg?react";
import ListIcon from "../assets/List_Unordered.svg?react";
import PlusIcon from "../assets/heroicons-outline_plus.svg?react";
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
import Menu from "../assets/Menu.svg?react";
import { List, AutoSizer, type ListRowRenderer } from "react-virtualized";
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
                    <ListIcon className="w-6 h-6 text-[#343434] mx-auto" />
                </Button>
                <Button className="h-[40px] w-[40px] rounded-lg bg-[#343434]" aria-label="Grid view">
                    <DashboardIcon className="w-6 h-6 text-[#b3b4b3] mx-auto my-auto" />
                </Button>
            </div>
        )
    };


    return (
        <div className="flex relative w-full min-h-screen bg-[#121212] font-inter text-white">
            {/* Sidebar */}
            <SideBar handleNavigationClick={handleNavigationClick} />

            {/* Main Content */}
            <div className="flex-1">
                <Menu className="w-5 h-5 mt-[23px] mb-[35px] ml-4 block md:hidden" />
                {/* Header */}
                <div className="mb-[35px] py-6 px-10 items-center justify-between sticky top-0 z-10 h-[92px] hidden md:flex">
                    <Input leftIcon={renderLeftIcon} />
                    <div className="items-center flex space-x-4">
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
                            className="bg-white cursor-pointer font-figtree hidden md:flex text-[#030500] px-3 py-2 rounded-xl mt-auto w-auto items-center justify-center h-[42px] space-x-2 font-medium text-[15px] transition-colors"
                            onClick={handleAddNewUser}
                            icon={() => <PlusIcon className="w-4.5 h-4.5" />}
                        >

                            <span>Add new</span>
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-3.5 rounded-xl flex h-[62px] items-center bg-[#1e1e1e] border border-[#181818]">

                        <Input placeholder="Search user by name" onChange={handleSearchChange} variant="searchTwo" rightIcon={renderRightIcon} leftIcon={renderLeftIcon} />

                    </div>
                    {/* User Grid */}
                    <div className="w-full h-[calc(100vh-300px)]">
                        {/* included here a refetch button to reload users if the fetch fails */}
                        {isLoading && <Spinner />}
                        {isFetching && !isLoading && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><Spinner /></div>}
                        {error && !isLoading && !isFetching && (
                            <div className="flex flex-col items-center justify-center h-full space-y-4">
                                <h1 className="text-white ">Failed to load users</h1>
                                <Button onClick={refetch} className="bg-white cursor-pointer text-[#030500] rounded-lg py-2 px-3 mt-2 font-medium hover:bg-gray-100 transition-colors">Retry</Button>
                            </div>
                        )}
                        <Suspense fallback={<Spinner />}>
                            {/* used react-virtualized and autosizer to optimize rendering of large lists by only rendering visible items */}
                            <AutoSizer>
                                {({ width, height }) => {
                                    const GAP_X = 20;
                                    const GAP_Y = 10;
                                    const MIN_CARD_WIDTH = 319;

                                    const columnCount = Math.max(1, Math.floor((width - GAP_X) / (MIN_CARD_WIDTH - GAP_X)));
                                    const rowCount = Math.ceil(results.length / columnCount);
                                    const CARD_WIDTH = (width - GAP_X * (columnCount - 1)) / columnCount;
                                    const ROW_HEIGHT = 214;

                                    const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
                                        const items: JSX.Element[] = [];
                                        const startIndex = index * columnCount;

                                        for (let i = 0; i < columnCount; i++) {
                                            const result = results[startIndex + i];
                                            if (!result) break;

                                            items.push(
                                                <div
                                                    key={result.id}
                                                    style={{
                                                        width: CARD_WIDTH,
                                                        marginRight: i < columnCount - 1 ? GAP_X : 0,
                                                    }}
                                                >

                                                    <Cards user={result} handleUserClick={handleUserClick} />

                                                </div>
                                            );
                                        }

                                        return (
                                            <div
                                                key={key}
                                                style={{
                                                    ...style,
                                                    display: "flex",
                                                    marginBottom: GAP_Y,
                                                    boxSizing: "border-box",
                                                }}
                                            >
                                                {items}
                                            </div>
                                        );
                                    };

                                    return (
                                        <List
                                            width={width}
                                            height={height}
                                            rowCount={rowCount}
                                            rowHeight={ROW_HEIGHT + GAP_Y}
                                            rowRenderer={rowRenderer}
                                        />
                                    );
                                }}
                            </AutoSizer>
                        </Suspense>
                    </div>

                    {/* Modals */}
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