import { RiHomeSmileLine, RiHomeSmileFill, RiPriceTag3Line, RiPriceTag3Fill, RiBook3Fill, RiBook3Line } from "react-icons/ri";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import { IoStatsChartOutline, IoStatsChartSharp, IoRocketOutline, IoRocketSharp } from "react-icons/io5";

export const sidebarData = [
    {
        title: "General",
        icon: <RiHomeSmileLine />,
        activeIcon: <RiHomeSmileFill />,
        link: "general",
    },
    {
        title: "Boosters",
        icon: <IoRocketOutline />,
        activeIcon: <IoRocketSharp />,
        link: "boosters",
    },
    {
        title: "Roles",
        icon: <RiPriceTag3Line />,
        activeIcon: <RiPriceTag3Fill />,
        link: "roles",
    },
    {
        title: "Logging",
        icon: <RiBook3Line />,
        activeIcon: <RiBook3Fill />,
        link: "logging",
    },
    {
        title: "Greet",
        icon: <AiOutlineMessage />,
        activeIcon: <AiFillMessage />,
        link: "greet",
    },
    {
        title: "Stats",
        icon: <IoStatsChartOutline />,
        activeIcon: <IoStatsChartSharp />,
        link: "stats",
    },
]