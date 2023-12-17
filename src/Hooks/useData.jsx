import { useSelector, useDispatch } from "react-redux";
import { setItems, setLoadingData } from "../Redux/actions";

export function useData() {
    const dispatch = useDispatch();
    const loadingData = useSelector((state) => state.main.loadingData);
    const items = useSelector((state) => state.main.dataReducer);

    const getItems = async () => {
        dispatch(setLoadingData(true));
        const uuid = localStorage.getItem("uuid");
        const url = `https://localhost:7171/api/ToDo`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                const filteredData = data.filter((item) => item.userId === uuid);
                dispatch(setItems(filteredData));
            }
        } catch (error) {
            dispatch(setLoadingData(false));
            throw error;
        } finally {
            setTimeout(() => {
                dispatch(setLoadingData(false));
            }, 500);
        }
    };

    return {
        loadingData,
        items,
        getItems,
    };
}
