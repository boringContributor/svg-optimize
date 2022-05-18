import { Button, Table, Tag, Text } from "@geist-ui/core";
import { X } from "@geist-ui/icons";
import Uppy from "@uppy/core";
import { FC, useMemo } from "react";
import { useFileStore } from "../store/file.store";

enum Status {
    READY = 'READY'
}
type TableProps = {
    name: string;
    status: Status;
    size: string;

    method?: any;
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



export const SvgList: FC<{ uppy: Uppy }> = ({ uppy }) => {
    const { files, removeFile } = useFileStore();

    const data = useMemo<TableProps[]>(() => {
        return files.map(file => ({ name: file.name, status: Status.READY, size: `${String(file.size)}` }))
    }, [files])

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

    return (
        <Table<TableProps> data={data}>
            <Table.Column prop="name" />
            <Table.Column prop="status" render={renderStatus} />
            <Table.Column prop="size" render={renderBadge} />
            <Table.Column prop="method" render={renderAction} />
        </Table>
    )
};