import { Button, Table, Tag, Text } from "@geist-ui/core";
import { X } from "@geist-ui/icons";
import Uppy from "@uppy/core";
import { FC, useEffect, useState } from "react";
import { useFileStore } from "../store/file.store";

enum Status {
    READY = 'READY',
    FINISHED = 'FINISHED'
}
type TableProps = {
    name: string;
    status: Status;
    size: number;

    method?: any;
}

const renderStatus = (_: any, rowData: TableProps) => {
    const { files } = useFileStore();
    const file = files.find(file => file.name === rowData.name);
    return (
        <Tag type={file?.id ? 'success' : 'secondary'}>{file?.id ? Status.FINISHED : Status.READY}</Tag>
    )
}

const renderBadge = (_: any, rowData: TableProps) => {
    const { files } = useFileStore();
    const oldSize = rowData.size
    const newSize = files.find(file => file.name === rowData.name)?.size;
    return (
        <Text>{oldSize} bytes {newSize ? `➞ ${~~newSize} bytes` : undefined}</Text>
    )
}

export const SvgList: FC<{ uppy: Uppy }> = ({ uppy }) => {
    const { removeFile } = useFileStore()
    const [files, setFiles] = useState<TableProps[]>(uppy.getFiles().map(file => ({ name: file.name, status: Status.READY, size: file.size })))


    useEffect(() => {
        uppy.on('file-removed', removedFile => {
            setFiles(files.filter(file => file.name !== removedFile.name))
        });
    }, [uppy])

    const renderAction = (_: any, rowData: TableProps) => {
        const removeHandler = () => {
            const fileName = rowData.name;
            const fileID = uppy.getFiles().find(file => file.name === fileName)?.id as string;
            uppy.removeFile(fileID)
            removeFile(fileName)
        }
        return (
            <Button style={{ textAlign: 'center' }} type="error" iconRight={<X />} auto scale={2 / 3} px={0.6} onClick={removeHandler} />
        )
    }

    return (
        <Table<TableProps> data={files}>
            <Table.Column prop="name" />
            <Table.Column prop="status" render={renderStatus} />
            <Table.Column prop="size" render={renderBadge} />
            <Table.Column prop="method" render={renderAction} />
        </Table>
    )
};