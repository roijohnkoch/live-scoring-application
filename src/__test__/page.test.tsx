import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import fetchMock from 'jest-fetch-mock';
import { sportsData } from '@/lib/api/placeholder-data'

describe('Page', () => {
  it('renders a heading', () => {
    fetchMock.mockResponseOnce(JSON.stringify(sportsData));
    render(<Page />)
 
    const textElement = screen.getByText('Live Scoring');
    expect(textElement).toBeInTheDocument();
  })
})