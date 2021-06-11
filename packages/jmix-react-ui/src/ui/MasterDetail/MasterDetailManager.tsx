import { Row, Col, Card } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import {MasterDetailProvider, useMasterDetailStore} from './MasterDetailContext';

const MasterDetailBrowserWrapper = observer(({children}: {children: React.ReactNode}) => {
    const masterDetailStore = useMasterDetailStore();
    
    return (
        <Card style={{height: '100%'}}>
            {masterDetailStore.isOpenEditor ? children : <FormattedMessage id="masterDetail.entityUnselected" /> }
        </Card>
    )
});

interface MasterDetailManagerProps {
    editor: React.ReactNode;
    browser: React.ReactNode;
}

export const MasterDetailManager = ({
    editor,
    browser,
}: MasterDetailManagerProps) => {
    return (
        <MasterDetailProvider>
            <Row>
                <Col
                    span={16}
                    style={{ position: 'relative' }}
                >
                    <Card style={{height: '100%'}}>
                        {browser}
                    </Card>
                </Col>
                <Col span={8}>
                    <MasterDetailBrowserWrapper>
                        {editor}
                    </MasterDetailBrowserWrapper>
                </Col>
            </Row>
        </MasterDetailProvider>
    );
};
