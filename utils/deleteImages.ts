import { unlink } from 'fs/promises'

export async function deleteFiles(files: string[]): Promise<void> {
    for (const src of files) {
        try {
            await unlink(`public/media/${src}`);
        } catch (error) {
            if (error.code !== 'ENOENT') throw new Error(error);
        }
    }
}