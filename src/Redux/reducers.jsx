const initialState = {
    items: [],
    loadingData: false,
};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_ITEMS":
            return { ...state, items: action.payload };
        case "SET_LOADING_DATA":
            return { ...state, loadingData: action.payload };
        default:
            return state;
    }
}
