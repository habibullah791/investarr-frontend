// Function to set an item in session storage
export const setSessionStorage = (key, value) => {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting session storage:', error);
    }
};

// Function to get an item from session storage
export const getSessionStorage = (key) => {
    try {
        const storedItem = sessionStorage.getItem(key);
        return storedItem ? JSON.parse(storedItem) : null;
    } catch (error) {
        console.error('Error getting session storage:', error);
        return null;
    }
};

// Function to remove an item from session storage
export const removeSessionStorage = (key) => {
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing session storage:', error);
    }
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

// Function to get three random videos
export const getRandomVideos = (articles) => {
    const selectedArticles = [];
    const selectedVideos = [];

    // Select three random articles
    while (selectedArticles.length < 3) {
        const randomIndex = getRandomIndex(articles.length);
        if (!selectedArticles.includes(randomIndex)) {
            selectedArticles.push(randomIndex);
        }
    }

    // Select one random video from each selected article
    selectedArticles.forEach((index) => {
        const randomVideoIndex = getRandomIndex(articles[index].videos.length);
        selectedVideos.push(articles[index].videos[randomVideoIndex]);
    });

    return selectedVideos;
};
