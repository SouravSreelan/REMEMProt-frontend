interface ResultItem {
    id: string;
    pmid: string;
    author: string;
    paper: string;
    organism: string;
    CellOrtissue: string;
    disease: string;
    profileOrDifex: string;
    contxtOfIdent: string;
    contxtOfDiferentialREG: string;
    test: string;
    control: string;
    foldchange: string;
    expression: string;
    protienExtractMethod: string;
    geneSymbol: string;
    geneID: string;
    tissueType: string;
    cancerType: string;
    cellName: string;
    isTrans: string;
}


interface pagination {
    has_next: boolean;
    total_pages: number;
}


interface EnrichmentResult {
    count: number;
    enrichment: string;
    p_value: number;
    percentage: string;
    method: string
    log10pval: number;
    term:string;
}

interface BubbleChartProps {
    data: EnrichmentResult[];
}


interface JsonDataProps {
    organisms: string;
    data: {
        analysis: string;
        context: string;
        method: string;
        proteinData: proteinDataProps[];
        tissue_or_cell_line: string; // Add this property if it exists in your data
        pubmedId: string; // Add this property if it exists in your data
    }[];
}
interface proteinDataProps {
    gene: string;
    transmemStatus: string;
    cellMarker: {
        tissueType: string;
        cancerType: string;
        cellName: string;
    }[];
}[]

interface TooltipItemProps {
    x: number;
    y: number;
    r: number;
    rmid: string;
    p_value: number;
}
