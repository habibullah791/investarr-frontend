// Utility function to set data in localStorage with timestamp
export const setLocalStorageWithExpiry = (key, value) => {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

// Utility function to get data from localStorage and check expiry
export const getLocalStorageWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    // If the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // Compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, remove it from localStorage and return null
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
};


// Function to set an item in local storage
export const UploadSingleImageToCloud = async (image_file) => {
    const image_selected = image_file;

    try {
        if (!image_selected) {
            return;
        }
        const formData2 = new FormData();
        formData2.append("file", image_selected);
        formData2.append("upload_preset", "lxesb57s");
        try {
            const response = await fetch(' https://api.cloudinary.com/v1_1/dojdwzskq/image/upload', {
                method: 'POST',
                body: formData2,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest', // This header might be required by Cloudinary
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data.secure_url;
            } else {
                console.error('Failed to upload image:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }

    } catch (error) {
        return error;
    }
}
export const UploadMultipleImagesToCloud = async (image_files) => {
    try {
        const uploadedImageUrls = [];

        for (const image_file of image_files) {
            const formData = new FormData();
            formData.append("file", image_file);
            formData.append("upload_preset", "w2fsqv0e");

            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/dl8ppbbgu/image/upload', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest', // This header might be required by Cloudinary
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    uploadedImageUrls.push(data.secure_url);
                } else {
                    console.error('Failed to upload image:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        return uploadedImageUrls;
    } catch (error) {
        console.log("error", error);
        return [];
    }
}


// Function to get a random number between 0 and max (exclusive)
const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
};
// Function to get up to three random videos
export const getRandomVideos = (articles) => {
    const selectedArticles = [];
    const selectedVideos = [];

    // Filter articles that contain videos
    const articlesWithVideos = articles.filter(article => article.videos.length > 0);

    if (articlesWithVideos.length === 0) {
        return [];
    }

    // Select up to three random articles
    while (selectedArticles.length < 3 && selectedArticles.length < articlesWithVideos.length) {
        const randomIndex = getRandomIndex(articlesWithVideos.length);
        if (!selectedArticles.includes(randomIndex)) {
            selectedArticles.push(randomIndex);
        }
    }

    // Select one random video from each selected article
    selectedArticles.forEach((index) => {
        const randomVideoIndex = getRandomIndex(articlesWithVideos[index].videos.length);
        selectedVideos.push(articlesWithVideos[index].videos[randomVideoIndex]);
    });

    return selectedVideos;
};
