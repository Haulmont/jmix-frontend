import React, {useEffect, useState} from "react";
import {Button, ButtonProps, Card, Space} from "antd";
import {AppErrorBoundary} from "../AppErrorBoundary";
import styles from "../App.module.css"
import {registerScreen, MultiScreenErrorBoundary} from "@haulmont/jmix-react-web";

const ROUTING_PATH = "/errorBoundaryTests";

const ErrorBoundaryTests = () => {
    return (
        <Space style={{width: "100%"}} direction="vertical">
            <Card title="Test screen level ErrorBoundary" size="small" className={styles.narrowLayout}>
                <MultiScreenErrorBoundary>
                    <Space direction="vertical">
                        <ButtonRenderTest
                            text="Render undefined"
                            render={<RenderUndefined/>}
                        />
                        <ButtonRenderTest
                            text="Exceed callstack"
                            render={<ExceedCallstack/>}
                        />
                        <ButtonRenderTest
                            text="Iterate over undefined object"
                            render={<IterateOverUndefined/>}
                        />
                        <ButtonRenderTest
                            text="Render object"
                            render={<RenderObject/>}
                        />
                        <ButtonRenderTest
                            text="Throw error inside use effect hook"
                            render={<EffectHookError/>}
                        />
                    </Space>
                </MultiScreenErrorBoundary>
            </Card>
            <Card title="Test app level ErrorBoundary" size="small" className={styles.narrowLayout}>
                <AppErrorBoundary>
                    <Space direction="vertical">
                        <ButtonRenderTest
                            text="Render undefined"
                            render={<RenderUndefined/>}
                        />
                        <ButtonRenderTest
                            text="Exceed callstack"
                            render={<ExceedCallstack/>}
                        />
                        <ButtonRenderTest
                            text="Iterate over undefined object"
                            render={<IterateOverUndefined/>}
                        />
                        <ButtonRenderTest
                            text="Render object"
                            render={<RenderObject/>}
                        />
                        <ButtonRenderTest
                            text="Throw error inside use effect hook"
                            render={<EffectHookError/>}
                        />
                    </Space>
                </AppErrorBoundary>
            </Card>
        </Space>
    )
}

const ButtonRenderTest = (props: ButtonProps & { render: React.ReactNode, text: string }) => {
    const [renderTestComponent, setRenderTestComponent] = useState(false);
    return (
        <>
            <Button {...props} onClick={() => setRenderTestComponent(true)}>{props.text}</Button>
            {renderTestComponent === true && props.render}
        </>
    )
}

const EffectHookError = () => {
    useEffect(() => {
        throw new Error("useEffect hook throw error")
    }, []);

    return null;
}
const IterateOverUndefined = () => {
    const items = undefined as unknown as [];
    return <div>{items.map(item => item)}</div>
}
const RenderObject = () => {
    const text = {value: ""} as unknown as string;
    return <div>{text}</div>
}
const ExceedCallstack = () => {
    const infiniteRecursion = () => infiniteRecursion();
    infiniteRecursion();

    return null;
}
const RenderUndefined = () => {
    const arr = [];
    return arr[1];
}

registerScreen({
    component: ErrorBoundaryTests,
    caption: "screen.ErrorBoundaryTests",
    screenId: "ErrorBoundaryTests",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    }
});


export default ErrorBoundaryTests