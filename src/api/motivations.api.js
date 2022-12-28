import axios from 'axios';

export const createMotivation = motivation =>
    axios.post(
        `${process.env.SERVER_HOST}${process.env.MOTIVATIONS_API}`,
        motivation
    );

export const getMotivations = (cancelationToken, userId) =>
    axios.get(`${process.env.SERVER_HOST}${process.env.MOTIVATIONS_API}`, {
        headers: { userId },
        cancelToken: cancelationToken,
    });

export const getUniqueCategories = cancelationToken =>
    axios.get(
        `${process.env.SERVER_HOST}${process.env.MOTIVATIONS_API}/categories`,
        {
            cancelToken: cancelationToken,
        }
    );

export const getMotivationsByCategory = (cancelationToken, category, userId) =>
    axios.get(
        `${process.env.SERVER_HOST}${process.env.MOTIVATIONS_API}/filter?category=${category}`,
        { headers: { userId }, cancelToken: cancelationToken }
    );

export const updateMotivation = (id, newMotivation) =>
    axios.patch(
        `${process.env.SERVER_HOST}${process.env.MOTIVATIONS_API}/${id}`,
        newMotivation
    );

export const updateActivation = (id, activation) =>
    axios.patch(
        `${process.env.SERVER_HOST}${process.env.MOTIVATIONS_API}/activation/${id}`,
        activation
    );

export const deleteMotivation = id =>
    axios.delete(
        `${process.env.SERVER_HOST}${process.env.MOTIVATIONS_API}/${id}`
    );
