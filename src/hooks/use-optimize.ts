import { UppyFile } from "@uppy/core";
import { Data } from "../shared/types";
import { saveAs } from 'file-saver';
import JSZip from 'jszip'
import { useFileStore } from "../store/file.store";


export const useOptimize = () => {
    const { files } = useFileStore();

    const optimizeFiles = async (files: UppyFile[]): Promise<Data[]> => {
        const payload: Data[] = await Promise.all(files.map(async file => ({ id: file.id, name: file.name, svg: await file.data.text(), size: file.data.size })))
        const result = await fetch('/api/optimize', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        return await result.json();
    }

    const downloadFilesAsZip = async () => {
        const zip = new JSZip();
        for (const file of files) {
            const blob = new Blob([file.svg], { type: 'image/svg+xml;charset=utf-8' });
            zip.file(file.name, blob)
        }
        zip.generateAsync({ type: 'blob' }).then(content => saveAs(content, 'result.zip'))
    }

    return { optimizeFiles, downloadFilesAsZip };
};