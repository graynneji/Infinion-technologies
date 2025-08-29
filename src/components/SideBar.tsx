import DashboardIcon from "../assets/mage_dashboard.svg?react";
import StarFourIcon from "../assets/ph_star-four.svg?react";
import SolarIcon from "../assets/solar_tag-linear.svg?react";
import LocationIcon from "../assets/ic_round-location-searching.svg?react";
import AnalyticsIcon from "../assets/uim_analytics.svg?react";

interface NavigationItem {
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
}

interface SideBarProps {
    // navigationItems: NavigationItem[];
    handleNavigationClick: (label: string) => void;
}

const navigationItems: NavigationItem[] = [
    {
        icon: <DashboardIcon className="w-6 h-6" />,
        label: "Dashboard"
    },
    {
        icon: <LocationIcon className="w-6 h-6" />,
        label: "Users",
        isActive: true
    },
    {
        icon: <SolarIcon className="w-6 h-6" />,
        label: "Vouchers"
    },
    {
        icon: <AnalyticsIcon className="w-6 h-6" />,
        label: "Analytics"
    },
    {
        icon: <StarFourIcon className="w-6 h-6" />,
        label: "Spotlight"
    }
];

const SideBar: React.FC<SideBarProps> = ({ handleNavigationClick }) => {
    return (
        <div className="w-[233px] bg-[#1e1e1e] hidden md:block">
            {/* Logo */}
            <h1 className="pt-[27px] pl-[45px] text-[32px] font-bold font-kavoon bg-[linear-gradient(90deg,#3B82F6_0%,rgba(147,51,234,0.5)_50%,rgba(147,51,234,0)_100%)] bg-clip-text text-transparent">useID</h1>

            {/* Navigation */}
            <nav className="max-w-[220.22px] w-full max-h-[549.69px] h-full space-y-2.5 mt-[46.85px] ml-[12.78px]">
                {navigationItems.map((item) => (
                    <div
                        key={item.label}
                        className={`flex items-center gap-4 px-3 py-4 cursor-pointer ${item.isActive
                            ? 'bg-[#222222] w-full border-gradient-left'
                            : ''
                            }`}
                        onClick={() => handleNavigationClick(item.label)}
                    >
                        {item.icon}
                        <span className="text-[16px] leading-[24px] font-normal text-[#b3b4b3]">{item.label}</span>
                    </div>
                ))}
            </nav>
        </div>
    );
}
export default SideBar;