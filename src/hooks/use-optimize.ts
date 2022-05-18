import { UppyFile } from "@uppy/core";

type Payload = {
    svg: string;
    size: number;
}

export const useOptimize = () => {
    const optimizeFiles = async (files: UppyFile[]) => {
        const payload: Payload[] = await Promise.all(files.map(async file => ({ svg: await file.data.text(), size: file.data.size })))
        const result = await fetch('/api/optimize', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        return await result.json();
    }

    return { optimizeFiles };
};