export const SET_DATA = 'SET_DATA';

export const setData = (data) => ({
    type: SET_DATA,
    data
});

export const CLEAR_DATA = 'CLEAR_DATA';

export const clearData = () => ({
    type: CLEAR_DATA,
});