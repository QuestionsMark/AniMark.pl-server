import { unlink } from 'fs/promises'

export async function deleteImages(images: string[]): Promise<void> {
    for (const src of images) {
        try {
            await unlink(`public/images/${src}`);
        } catch (error) {
            if (error.code !== 'ENOENT') throw new Error(error);
        }
    }
}