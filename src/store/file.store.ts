import create from 'zustand'
import { Data } from '../shared/types'

interface FileState {
    files: Data[]
    addFile: (newFile: Data) => void
    addFiles: (newFile: Data[]) => void
    removeFile: (name: string) => void

}

export const useFileStore = create<FileState>(set => ({
    files: [],
    addFile: (newFile: Data) => set(state => ({ files: [...state.files, newFile] })),
    addFiles: (newFiles: Data[]) => set(state => {
        const result = { files: [...state.files] }
        for (const file of newFiles) {
            if (state.files.find(c => c.id === file.id)) break;
            result.files.push(file)
        }
        return result;
    }),
    removeFile: (name: string) => set(state => ({ files: state.files.filter(file => file.name !== name) }))
}))