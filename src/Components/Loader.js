import React, {Fragment} from 'react';
import { Placeholder, Divider } from 'semantic-ui-react';
import "semantic-ui-css/semantic.css";

export const Loader = () => {
    return (
        <Fragment>
            <Placeholder>
                <Placeholder.Image square />
                <Placeholder.Header>
                    <Placeholder.Line length='very short' />
                    <Placeholder.Line length='medium' />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line length='short' />
                </Placeholder.Paragraph>
            </Placeholder>
            <Divider />
            <Placeholder>
                <Placeholder.Image square />
                <Placeholder.Header>
                    <Placeholder.Line length='very short' />
                    <Placeholder.Line length='medium' />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line length='short' />
                </Placeholder.Paragraph>
            </Placeholder>
        </Fragment>
    );
}