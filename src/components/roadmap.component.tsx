import { Card, Checkbox, Link, Text } from "@geist-ui/core"
import { FC } from "react"

export const Roadmap: FC = () => {
    return (
        <Card marginBottom={4}>
            <Text h4 my={0}>Roadmap</Text>
            <Card.Body>
                <Checkbox.Group value={['optimize']}>
                    <Checkbox disabled value="optimize">Optimize</Checkbox>
                    <Checkbox disabled value="rename">Rename</Checkbox>
                    <Checkbox disabled value="resize">Resize</Checkbox>
                </Checkbox.Group>
            </Card.Body>
            <Card.Footer>
                <Link color target="_blank" href="https://github.com/boringContributor/svg-optimize">Visit source code on GitHub.</Link>
            </Card.Footer>
        </Card>
    )
}