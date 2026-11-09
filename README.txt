We use memoryStorage() because it allows us to hold the file briefly in the server's RAM instead of saving it to the local disk.   
image_393cc0.png

By keeping the file in memory, we can stream the file's buffer directly to Cloudinary and then discard it. If we used disk storage, the file would be saved to your server's hard drive first, and you would have to add extra code to delete the temporary file after the Cloudinary upload finishes to prevent your server from running out of storage space.