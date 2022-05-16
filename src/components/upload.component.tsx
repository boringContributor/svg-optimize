import { useEffect, useMemo } from 'react'
import Uppy, { UppyFile } from '@uppy/core'
import DropTarget from '@uppy/drop-target'
import { FileInput, DragDrop, useUppy } from '@uppy/react'
import { X, Download } from '@geist-ui/icons'
import { Button, Card, Display, Spacer, Table, Tag, Text, Tooltip } from '@geist-ui/core'
import { Lock } from '@geist-ui/icons'
import { useFileStore } from '../store/file.store';
import XHRUpload from '@uppy/xhr-upload'

import '@uppy/core/dist/style.css'
import '@uppy/drop-target/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/file-input/dist/style.css'

const lockDisclaimer = "No data is stored on a server."

enum Status {
    READY = 'READY'
}
type TableProps = {
    name: string;
    status: Status;
    size: string;

    method?: any;
}

export const Upload = () => {
    const { files, addFile, removeFile } = useFileStore();

    const uppy = useUppy(() => {
        return new Uppy({
            debug: process.env.NODE_ENV === 'development',
            autoProceed: true,
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
        }).use(XHRUpload, {
            endpoint: '/api/hello',
            method: 'POST'
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

    const data = useMemo<TableProps[]>(() => {
        return files.map(file => ({ name: file.name, status: Status.READY, size: `${String(file.size)}` }))
    }, [files])

    const downloadFiles = async () => {
        // console.log(await uppy.upload())
    }
    const renderAction = (_: any, rowData: TableProps) => {
        const removeHandler = () => {
            const fileName = rowData.name;
            const fileID = files.find(file => file.name === fileName)?.id as string;

            uppy.removeFile(fileID)
            removeFile(fileName)
        }
        return (
            <Button style={{ textAlign: 'center' }} type="error" iconRight={<X />} auto scale={2 / 3} px={0.6} onClick={removeHandler} />
        )
    }

    const renderStatus = (_: any, rowData: TableProps) => {
        return (
            <Tag type="success">{rowData.status}</Tag>
        )
    }

    const renderBadge = (_: any, rowData: TableProps) => {
        return (
            <Text>{rowData.size} bytes ➞ {~~(+rowData.size * 0.3)} bytes</Text>
        )
    }

    return <>
        {
            files.length === 0 ? (
                <Display shadow width="500px" height="500px" caption={<><Tooltip text={lockDisclaimer}><Lock size={16} /></Tooltip><Spacer inline w={.35} />Maximum 50 Files with 3 MB each allowed</>}>
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
                    <Table<TableProps> data={data} hidden={files.length === 0}>
                        <Table.Column prop="name" />
                        <Table.Column prop="status" render={renderStatus} />
                        <Table.Column prop="size" render={renderBadge} />
                        <Table.Column prop="method" render={renderAction} />
                    </Table>
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