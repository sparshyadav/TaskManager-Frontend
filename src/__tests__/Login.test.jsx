import { render, screen } from '@testing-library/react';
import Login from '../pages/Auth/Login';
import React from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

jest.mock('axios', () => {
    const mockAxiosInstance = {
      post: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      }
    };
  
    return {
      create: () => mockAxiosInstance,
      __esModule: true,
      default: mockAxiosInstance
    };
  });
  

describe("Login Component", () => {
    test("renders login components correctly", () => {
        render(
            <BrowserRouter>
                <UserContext value={{ updateUser: jest.fn() }}>
                    <Login />
                </UserContext>
            </BrowserRouter>
        );

        expect(screen.getByText(/welcome back/i)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(/john@example.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/min 8 characters/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

        expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    })

    test("shows validation errors for invalid email and missing password", async () => {
        render(
            <BrowserRouter>
                <UserContext value={{ updateUser: jest.fn() }}>
                    <Login />
                </UserContext>
            </BrowserRouter>
        );

        const loginButton = screen.getByRole('button', { name: /login/i });
        loginButton.click();

        expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();

        const emailInput = screen.getByPlaceholderText(/john@example/i);
        emailInput.value = 'invalid-input';
        emailInput.dispatchEvent(new Event('input'));

        loginButton.click();

        expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    })

    test("logs in successfully and redirects user", async()=>{
        const mockNavigate=jest.fn();
        jest.mock('react-router-dom', ()=>({
            ...jest.requireActual('react-router-dom'),
            useNavigate: ()=>mockNavigate
        }));

        render(
            <BrowserRouter>
                <UserContext value={{ updateUser: jest.fn() }}>
                    <Login />
                </UserContext>
            </BrowserRouter>
        );

        axios.post.mockResolvedValue({
            data: {token: 'fake-token', role: 'user'}
        });

        screen.getByPlaceholderText(/john@example.com/i).value = "test@example.com";
    screen.getByPlaceholderText(/min 8 characters/i).value = "password123";

    screen.getByRole('button', { name: /login/i }).click();

    // Wait for API call and check if user was redirected
    await screen.findByText(/redirecting/i);
    expect(mockNavigate).toHaveBeenCalledWith("/user/dashboard");
    })
})