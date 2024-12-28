import { PrintingOrderContext } from "../../context/printing/PrintingOrdersContext"
import { useContext } from "react"

export const usePrintingOrderContext = () => {
    const context = useContext(PrintingOrderContext);

    if (!context) {
        throw new Error("Use printing order context should be used inside the context provider");
    }

    return context
}