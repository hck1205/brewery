import App, { Container } from 'next/app';
import React from 'react';

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}