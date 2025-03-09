import fs from "fs";
import path from "path";

// JSON file URLs
const JSON_FILES = [
    "https://pub-61a0ce49134240fc832eac0f30d0dabc.r2.dev/cms/homepage.json",
    "https://pub-61a0ce49134240fc832eac0f30d0dabc.r2.dev/cms/breeds/holland_lop.json",
    "https://pub-61a0ce49134240fc832eac0f30d0dabc.r2.dev/cms/breeds/netherland_dwarf.json",
    "https://pub-61a0ce49134240fc832eac0f30d0dabc.r2.dev/cms/gallery.json"
];

async function downloadImages() {
    const basePath = path.join(process.cwd(), "public", "static-images");
    const cmsPath = path.join(process.cwd(), "public", "cms"); // CMS JSON storage path

    for (const jsonUrl of JSON_FILES) {
        try {
            const response = await fetch(jsonUrl);
            const data = await response.json();

            // Convert image URLs to relative paths
            const updatedData = {
                ...data,
                images: await Promise.all(data.images.map(async (imageUrl) => {
                    return await downloadImage(imageUrl, basePath);
                }))
            };

            // Save updated JSON
            await saveJSON(jsonUrl, updatedData, cmsPath);

        } catch (error) {
            console.error(`❌ Error fetching ${jsonUrl}:`, error);
        }
    }

    console.log("✅ All images and JSON files downloaded successfully!");
}

// Function to save modified JSON in public/cms
async function saveJSON(jsonUrl, data, cmsPath) {
    try {
        const urlParts = new URL(jsonUrl);
        const pathSegments = urlParts.pathname.split("/").slice(2); // Skip leading slashes
        const saveDir = path.join(cmsPath, ...pathSegments.slice(0, -1)); // Directory path
        const fileName = pathSegments[pathSegments.length - 1]; // JSON file name
        const filePath = path.join(saveDir, fileName);

        // Ensure directory exists
        if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

        // Save JSON file with modified image paths
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        console.log(`✅ Saved JSON: ${filePath}`);
    } catch (error) {
        console.error(`❌ Error saving JSON file: ${jsonUrl}`, error);
    }
}

// Function to download images & return relative path
async function downloadImage(imageUrl, basePath) {
    try {
        const urlParts = new URL(imageUrl);
        const pathSegments = urlParts.pathname.split("/").slice(2); // Skip leading slashes and 'uploads'
        const saveDir = path.join(basePath, ...pathSegments.slice(0, -1)); // Directory path
        const imageName = pathSegments[pathSegments.length - 1]; // Image file name
        const imagePath = path.join(saveDir, imageName);

        // Ensure directory exists
        if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

        // Download and save image
        const imgResponse = await fetch(imageUrl);
        const buffer = await imgResponse.arrayBuffer();
        fs.writeFileSync(imagePath, Buffer.from(buffer));

        console.log(`✅ Downloaded: ${imagePath}`);

        // Return relative path from public
        return `/static-images/${pathSegments.join("/")}`;
    } catch (error) {
        console.error(`❌ Error downloading ${imageUrl}:`, error);
        return imageUrl; // Fallback to original URL if download fails
    }
}

// Run the script
downloadImages();
