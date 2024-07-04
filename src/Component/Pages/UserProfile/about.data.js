
export const PersonalInformation = (data) => [
    // { title: "Username", label: data?.username },
    { title: "Name", label: data?.first_name + " " + data?.last_name },
    // { title: "Profile Picture", label: data?.profile_pic_url },
    // { title: "Address", label: data?.address },
    { title: "Area of Interest", label: data?.area_of_interest },
    { title: "Bio", label: data?.bio },
    // { title: "Membership Tier", label: data?.membership_tier },
    // { title: "Verification Status", label: data?.verification_status },
    // { title: "Verification Badge", label: data?.verification_badge }
];

export const StartupInformation = (data) => [
    { title: "Startup Name", label: data?.startup_name },
    { title: "Startup Idea", label: data?.startup_idea },
    { title: "Startup Description", label: data?.startup_description }
];
