import fs from 'node:fs';
import path from 'node:path';

const VALID_IMAGE_EXTENSIONS = new Set([
    '.png',
    '.jpg',
    '.jpeg',
    '.webp',
    '.avif',
    '.gif',
]);

export const getHeaderImages = (): string[] => {
    const headersDir = path.join(process.cwd(), 'public', 'images', 'headers');

    if (!fs.existsSync(headersDir)) {
        return [];
    }

    return fs
        .readdirSync(headersDir, { withFileTypes: true })
        .filter((entry) => {
            return (
                entry.isFile() &&
                VALID_IMAGE_EXTENSIONS.has(
                    path.extname(entry.name).toLowerCase(),
                )
            );
        })
        .map((entry) => `/images/headers/${entry.name}`)
        .sort((a, b) => a.localeCompare(b));
};
