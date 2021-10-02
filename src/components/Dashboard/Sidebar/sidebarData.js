import { RiHomeSmileLine, RiHomeSmileFill, RiPriceTag3Line, RiPriceTag3Fill, RiBook3Fill, RiBook3Line } from "react-icons/ri";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { IoStatsChartOutline, IoStatsChartSharp, IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";

export const sidebarData = [
    {
        title: "General",
        icon: <RiHomeSmileLine />,
        activeIcon: <RiHomeSmileFill />,
        link: "general",
    },
    {
        title: "Setup",
        icon: <IoSettingsOutline />,
        activeIcon: <IoSettingsSharp />,
        link: "setup",
    },
    {
        title: "Greet",
        icon: <AiOutlineMessage />,
        activeIcon: <AiFillMessage />,
        link: "greet",
    },
    {
        title: "Logging",
        icon: <RiBook3Line />,
        activeIcon: <RiBook3Fill />,
        link: "logging",
    },
    {
        title: "Stats",
        icon: <IoStatsChartOutline />,
        activeIcon: <IoStatsChartSharp />,
        link: "stats",
    },
    {
        title: "Vars",
        icon: <RiPriceTag3Line />,
        activeIcon: <RiPriceTag3Fill />,
        link: "vars",
    },
]