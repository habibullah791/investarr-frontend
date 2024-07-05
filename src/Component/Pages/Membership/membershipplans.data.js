import { IoSparklesOutline, IoRocketOutline } from "react-icons/io5";
import { LuDiamond, LuCrown } from "react-icons/lu";

export const membershipPlans = [
    {
        name: "Basic",
        icon: IoSparklesOutline,
        price: 10,
        buttonTitle: "Get Started",
        features: [
            "Basic messaging",
            "Access to investor network",
            "Discounted event tickets",
            "Some information hidden"
        ],
    },
    {
        name: "Standard",
        icon: IoRocketOutline,
        price: 20,
        buttonTitle: "Get Started",
        features: [
            "All Starter features",
            "Access to all profiles",
            "Personalized investment recommendations",
            "Priority access to investment opportunities",
            "Most information visible"
        ],
    },
    {
        name: "Premium",
        icon: LuCrown,
        price: 30,
        buttonTitle: "Get Started",
        features: [
            "Access to all profiles",
            "1-on-1 coaching",
            "Exclusive content",
            "Full information visibility"
        ],
    },
    {
        name: "Premium Plus",
        icon: LuDiamond,
        price: 120,
        buttonTitle: "Customize",
        features: [
            "Access to all profiles",
            "1-on-1 coaching",
            "Exclusive content",
            "Full information visibility"
        ],
    },
];

export const benefits = [
    "Connect with potential investors and investees",
    "Access to detailed profiles",
    "Priority support",
    "Exclusive content and resources",
];