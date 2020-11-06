import React from 'react';
import {MockedProvider} from '@apollo/client/testing';

import '@testing-library/jest-dom/extend-expect';
import {cleanup, render, waitFor} from '@testing-library/react';
import {Dog, GET_DOG_QUERY} from './App';

const mocks = [
    {
        request: {
            query: GET_DOG_QUERY,
            variables: {
                name: 'Buck',
            },
        },
        result: {
            data: {
                dog: {id: '1', name: 'Buck', breed: 'bulldog'},
            },
        },
    },
];

const mocksWithNoData = [
    {
        request: {
            query: GET_DOG_QUERY,
            variables: {
                name: 'Buck',
            },
        },
        result: {
            data: null,
        },
    },
];

describe('Bloody dog', () => {
    afterEach(() => {
        return cleanup();
    });

    it('renders without error', async () => {
        const {container, getByText} = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Dog name="Buck"/>
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(getByText(/Buck is a bulldog/)).toBeInTheDocument();
        });
    });

    it('renders loading', async () => {
        const {container, getByText} = render(
            <MockedProvider mocks={[]}>
                <Dog name="Buck"/>
            </MockedProvider>,
        );

        expect(getByText(/Loading/)).toBeInTheDocument();
    });

    it('renders no data', async () => {
        const {container, getByText} = render(
            <MockedProvider mocks={mocksWithNoData}>
                <Dog name="Buck"/>
            </MockedProvider>,
        );

        await waitFor(() => {
            expect(container).toBeEmptyDOMElement();
        });
    });
});
