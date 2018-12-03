const initialState = {
    timeSeries: JSON.parse(localStorage.getItem('timeSeries'))
};

const rootReducer =(state = initialState, action) => {
    switch(action.type){
        default:
            console.log(state);
            return state;
    }
};
export default rootReducer;


