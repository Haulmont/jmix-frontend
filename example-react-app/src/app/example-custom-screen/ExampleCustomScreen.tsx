import {ContentDisplayMode, useMainStore} from "@haulmont/jmix-react-core";
import {Divider, Radio, RadioChangeEvent, Space} from "antd";
import React, {useCallback, useState} from "react";
import {registerScreen} from "@haulmont/jmix-react-ui";

const ROUTING_PATH = "/exampleCustomScreen";

export const ExampleCustomScreen = () => {
    const mainStore = useMainStore();

    const [contentDisplayMode, setContentDisplayMode] = useState(mainStore.contentDisplayMode);

    const handleContentDisplayModeChange = useCallback((e: RadioChangeEvent) => {
        if (Object.values(ContentDisplayMode).includes(e.target.value)) {
            mainStore.contentDisplayMode = e.target.value;
            setContentDisplayMode(mainStore.contentDisplayMode);
        }
    }, [mainStore, setContentDisplayMode]);

    return (
        <>
            <h2>
                Example Custom Screen
            </h2>
            <Divider/>
            <div>
                <div><code>ContentDisplayMode:</code></div>
                <Radio.Group onChange={handleContentDisplayModeChange} value={contentDisplayMode}>
                    <Space direction='vertical'>
                        <Radio value={ContentDisplayMode.ActivateExistingTab}>
                            <code>ContentDisplayMode.ActivateExistingTab</code>
                        </Radio>
                        <Radio value={ContentDisplayMode.AlwaysNewTab}>
                            <code>ContentDisplayMode.AlwaysNewTab</code>
                        </Radio>
                        <Radio value={ContentDisplayMode.NoTabs}>
                            <code>ContentDisplayMode.NoTabs</code>
                        </Radio>
                    </Space>
                </Radio.Group>
            </div>
        </>
    )
};

registerScreen({
    component: ExampleCustomScreen,
    caption: "screen.ExampleCustomScreen",
    screenId: "ExampleCustomScreen",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    }
});
