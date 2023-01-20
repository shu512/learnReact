import { useMemo } from "react";

export const usePagination = (totalPages) => 
    useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);