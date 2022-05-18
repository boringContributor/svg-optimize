import { FC, useEffect } from 'react'
import { Button, Card, Display, Spacer, Tooltip } from '@geist-ui/core'
import { Download, Lock } from '@geist-ui/icons'
import Uppy, { UppyFile } from '@uppy/core'
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import DropTarget from '@uppy/drop-target'
import '@uppy/drop-target/dist/style.css'
import '@uppy/file-input/dist/style.css'
import { DragDrop, FileInput, useUppy } from '@uppy/react'
import { useOptimize } from '../hooks/use-optimize'
import { useFileStore } from '../store/file.store'
import { SvgList } from './svg-list.component'

const lockDisclaimer = "No data is stored on a server."

export const Upload: FC = () => {
    const { files, addFile } = useFileStore();
    const { optimizeFiles } = useOptimize();

    const uppy = useUppy(() => {
        return new Uppy({
            debug: process.env.NODE_ENV === 'development',
            autoProceed: false,
            allowMultipleUploadBatches: true,
            restrictions: {
                maxFileSize: 3000000,
                maxNumberOfFiles: 50,
                minNumberOfFiles: 1,
                allowedFileTypes: ['.svg'],
            },
            onBeforeFileAdded: (currentFile: UppyFile) => {
                if (currentFile.extension !== 'svg') return;
                addFile(currentFile);
                return currentFile
            },
        })
    });

    useEffect(() => {
        return () => uppy.close();
    }, [])

    useEffect(() => {
        uppy.use(DropTarget, {
            target: '#dropzone',
        });
    }, [uppy]);


    const downloadFiles = async () => {
        console.log(await optimizeFiles(files))
    }

    return <>
        {
            files.length === 0 ? (
                <Display shadow width="500px" height="500px" caption={<><Tooltip text={lockDisclaimer}><Lock size={16} /></Tooltip>
                    <Spacer inline w={.35} />Maximum 50 Files with 3 MB each allowed</>}>
                    <DragDrop
                        width="100%"
                        height="100%"
                        uppy={uppy}
                        locale={{
                            strings: {
                                dropHereOr: 'Drop here or %{browse}',
                                browse: 'browse',
                            },
                        }}
                    />
                </Display>
            ) : (
                <Card style={{ width: 1000 }}>
                    <SvgList uppy={uppy} />
                    <Card.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FileInput uppy={uppy} pretty inputName="files[]" locale={{
                            strings: {
                                chooseFiles: "Add more files"
                            }
                        }} />
                        <Button type="success" icon={<Download />} auto onClick={downloadFiles}>Download</Button>
                    </Card.Footer>
                </ Card>
            )
        }
    </>
}