import { UppyFile } from '@uppy/core'
import create from 'zustand'

interface FileState {
    files: UppyFile[]
    addFile: (newFile: UppyFile) => void
    removeFile: (fileName: string) => void

}

export const useFileStore = create<FileState>(set => ({
    files: [],
    addFile: (newFile: UppyFile) => set(state => ({ files: [...state.files, newFile] })),
    removeFile: (fileName: string) => set(state => ({ files: state.files.filter(file => file.name !== fileName) }))
}))