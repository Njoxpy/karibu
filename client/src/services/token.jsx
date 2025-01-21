// get token

export const getToken = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        return "Token not found"
    }
}