const Pagination = () => {
    const itemsPerPage = 6; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Get the items to display on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    // Function to change pages
    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
        </>
    )
}

export default Pagination;